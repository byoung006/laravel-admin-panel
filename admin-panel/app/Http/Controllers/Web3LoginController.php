<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Elliptic\EC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use kornrunner\Keccak;

class Web3LoginController extends Controller
{
    public function message(): string
    {
        $nonce = Str::random();
        $message =
            "Sign this message to confirm you own this wallet address. This action will not cost any gas fees.\n\nNonce: " .
            $nonce;

        session()->put("sign_message", $message);

        // return the message and nonce in a JSON response
        return $message;
    }

    /**
     * @throws \Exception
     */
    public function verify(Request $request)
    {
        $result = $this->verifySignature(
            session()->pull("sign_message"),
            $request->input("signature"),
            $request->input("address")
        );
        // If $result is true, perform additional logic like logging the user in, or by creating an account if one doesn't exist based on the Ethereum address
        if ($result !== true) {
            return "Invalid signature";
        }
        $address = $request->input("address");
        // check if the address is already in the database
        $user = User::where("address", $address)->exists();
        if (!$user) {
            $registeredUserController = new RegisteredUserController();
            $registeredUserController->store($request->input("address"));
            // return a status message to the user in JSON format
            return "User created";
        }
        return redirect(RouteServiceProvider::HOME);
    }

    /**
     * @throws \Exception
     */
    protected function verifySignature(
        string $message,
        string $signature,
        string $address
    ): bool {
        $hash = Keccak::hash(
            sprintf(
                "\x19Ethereum Signed Message:\n%s%s",
                strlen($message),
                $message
            ),
            256
        );

        $sign = [
            "r" => substr($signature, 2, 64),
            "s" => substr($signature, 66, 64),
        ];
        $recid = ord(hex2bin(substr($signature, 130, 2))) - 27;

        if ($recid != ($recid & 1)) {
            return false;
        }

        $pubkey = (new EC("secp256k1"))->recoverPubKey($hash, $sign, $recid);
        $derived_address =
            "0x" .
            substr(
                Keccak::hash(substr(hex2bin($pubkey->encode("hex")), 1), 256),
                24
            );

        return Str::lower($address) === $derived_address;
    }
}

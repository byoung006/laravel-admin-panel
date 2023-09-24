<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("users", function (Blueprint $table) {
            $table->dropColumn("name");
            $table->dropColumn("email");
            $table->dropColumn("email_verified_at");
            $table->dropColumn("password");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("users", function (Blueprint $table) {
            $table->string("name");
            $table->string("email");
            $table->timestamp("email_verified_at");
            $table->string("password");
        });
    }
};

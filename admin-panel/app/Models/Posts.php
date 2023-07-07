<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Posts extends Model
{
    use HasFactory;
    protected $table = 'posts';
    protected $fillable = ['title', 'body'];


    public mixed $title;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
   // function to return all posts by the user with the given id
    public static function getUserPosts($user)
    {
        $query = Posts::all()->where('user_id', $user->id);
        return $query;
    }
}

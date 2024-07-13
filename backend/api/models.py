from typing import Optional, List, Dict, Any
from datetime import datetime
"""user model"""

class User:
    """This is the user model """
    def __init__(self,
                 first_name: str,
                 last_name: str,
                 username: str,
                 email: str,
                 password: str,
                 profile_picture: Optional[str] = None,
                 followers: Optional[List[int]] = None,
                 followings: Optional[List[int]] = None,
                 bio: Optional[str] = None,
                 is_admin: bool = False) -> None:
        """ Initializes the user class """
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.password = password
        self.profile_picture = profile_picture
        self.followers = followers if followers is not None else []
        self.followings = followings if followings is not None else []
        self.bio = bio
        self.is_admin = is_admin
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def to_dict(self) -> Dict[str, Any]:
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'profile_picture': self.profile_picture,
            'followers': self.followers,
            'followings': self.followings,
            'bio': self.bio,
            'is_admin': self.is_admin,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

class Post:
    """ This is the post model """
    def __init__(self,
                user_id: str,
                title: str,
                details: str,
                likes: Optional[List[int]] = None,
                book_img: Optional[str] = None,
                book_file: Optional[str] = None,
                comments: Optional[Dict[str, Any]] = None) -> None:
        """ Initializes the post model """
        self.title = title
        self.user_id = user_id
        self.details = details
        self.likes = likes if likes is not None else []
        self.book_img = book_img
        self.book_file = book_file
        self.comments = comments if comments is not None else {}
        self.created_at = datetime.utcnow()
    
    def to_dict(self) -> Dict[str, Any]:
        """ returns the post attribute as a dictionary """
        return {
            'user_id': self.user_id,
            'title': self.title,
            'details': self.details,
            'likes': self.likes,
            'book_img': self.book_img,
            'book_file': self.book_file,
            'comments': self.comments,
            'created_at': self.created_at
        }
        
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
    """ this is a post """
    def __init__(self, description):
        pass

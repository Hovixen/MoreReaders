import base64
import secrets
import os

def upload(file, folder):
    """function saves images in path"""
    # rel_path = ""
    if file:
        hex_name = secrets.token_hex(8)
        _, file_ext = os.path.splitext(file.filename)
        file_name = hex_name + file_ext
        rel_path = os.path.join('assets', 'images', file_name) if 'images' in folder else os.path.join('assets', 'books', file_name)
        file_path = os.path.join(folder, file_name)
        file.save(file_path)
        return rel_path
    return none

def base64Img(string_img, folder):
    """ function saves base64 encoded image to folder """
    if string_img:
        img_data = string_img.split(',')[1]
        img_data = base64.b64decode(img_data)

        hex_name = secrets.token_hex(8)
        file_ext = string_img.split(';')[0].split('/')[1]
        img_name = "{}.{}".format(hex_name, file_ext)
        rel_path = os.path.join('assets', 'images', img_name)
        file_path = os.path.join(folder, img_name)
        with open(file_path, 'wb') as file:
            file.write(img_data)
        return rel_path
    return none
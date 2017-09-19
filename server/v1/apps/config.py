import os

DB_USER = (os.environ.get('DB_USER','root'))
DB_PASS = (os.environ.get('DB_PASS','password'))
DB_HOST = (os.environ.get('DB_HOST','localhost'))
DB_DATABASE = (os.environ.get('DB_DATABASE','database'))
DB_TEST = (os.environ.get('DB_TEST','test'))
DB_TYPE = (os.environ.get('DB_TYPE','mysql'))
DB_PORT = (os.environ.get('DB_PORT','3306'))

DATABASE = DB_TYPE + '://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST + ":" + DB_PORT + '/' + DB_DATABASE
DATABASE_TEST = DB_TYPE + 'mysql://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST + ":" + DB_PORT + '/' + DB_TEST

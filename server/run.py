from flask_script import Manager, Server

from v1.apps import app, socketio

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(port)
    socketio.run(app, debug=True, port=port, host='0.0.0.0')

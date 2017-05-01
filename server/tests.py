import os
import unittest
import json

from apps import app, socketio
from flask_socketio import SocketIO, SocketIOTestClient

class MyTest(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()
        self.socketio = SocketIOTestClient(app, socketio, namespace='/games')

    def test_socket_connect(self):
        self.socketio.connect(namespace='/games')
        self.socketio.emit('games_test', {"data": "IT WORKS"}, namespace='/games');
        response = self.socketio.get_received('/games')
        assert 'connected' in response[0]['args']

    # def tearDown(self):
    #     self.socketio.disconnect()


if __name__ == '__main__':
    unittest.main()

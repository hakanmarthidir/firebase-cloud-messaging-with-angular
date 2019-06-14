import pika
import time
import json
import requests

credentials = pika.PlainCredentials('hakan', 'hakan')
connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost', 5672, '/', credentials))
channel = connection.channel()

channel.queue_declare(queue='myrabbit', durable=True)
print(' [*] Waiting for messages. To exit press CTRL+C')


def sendPushNotification(message, step):
    url = 'https://fcm.googleapis.com/fcm/send'
    payload = {
        "notification":
        {
            "title": "Client Message",
            "body": message['x']+ " " + message['y'] + " " + message['y'] + " " + step
        },
        "to": message['userid']
    }
    headers = {"Content-Type": "application/json",
               "Authorization": "key=CLOUD MESSAGING ID"}
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    print(r.content)


def step1(data):
    print("step1- send push notification")
    sendPushNotification(data,"Step 1 completed")


def step2(data):
    print("step2 - send push notification")
    sendPushNotification(data,"Step 2 completed")


def callback(ch, method, properties, body):
    
    data = body.decode('utf8')
    data = json.loads(json.loads(data))
    step1(data)
    step2(data)
    time.sleep(body.count(b'.'))
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='myrabbit', on_message_callback=callback)
channel.start_consuming()

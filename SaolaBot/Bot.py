from HalChatAPI import *
import time as timelib
from datetime import datetime
import math
import os
import json

menu_bot={
    #START MENU
    "start_menu":
    [
        {
            "icon":"pTKR7YtDd20FDQpZrbsuUqyMAEy77kzJHSmG1cSQ2yStJHJtEstToL1EiLJZMGyj2trl2KKqR1VXj9JctbOsck9zSsiwZfs9jtmh",
            "command":"старт",
            "description":"Хочу подписаться на новости экологии"
        }
    ],
    #DEFAULT USER
    "default_user":
    [
        {
            "icon":"pTKR7YtDd20FDQpZrbsuUqyMAEy77kzJHSmG1cSQ2yStJHJtEstToL1EiLJZMGyj2trl2KKqR1VXj9JctbOsck9zSsiwZfs9jtmh",
            "command":"отписаться",
            "description":"Хочу отписаться"
        },
        {
            "icon":"vnRXJAUabGzF1R5YevZnyFrwlvVAa56p5ygzBqchwQ05ZysREc3EM9xUusvXI5aYYkeQ7JUHb3i64tT17v2lYfkreHvAyGYjam1x",
            "command":"о нас",
            "description":"Информация о проекте"
        }
    ],
    #ADMIN USER
    "admin_user":
    [
        {
            "icon":"pTKR7YtDd20FDQpZrbsuUqyMAEy77kzJHSmG1cSQ2yStJHJtEstToL1EiLJZMGyj2trl2KKqR1VXj9JctbOsck9zSsiwZfs9jtmh",
            "command":"помощь",
            "description":"Получить список команд бота"
        }
    ]
}

hca=HalChatAPI("4HRZmHsl4KvQHhXGE5p5I6ZXWYxpQIt5dDpVtXnBkT2x6ByIFLBOXH8qiKoGBqxCcAJWQ99i78nku72CckM3vDuKi7EyIsrXAtAD",check_bots_messages=True,log_level=1)

#Class for add and get User Info
class BotUsers:
    #Load users data
    def __init__(self,hca,path='EcoBotUsers.json'):
        self.path=path
        self.hca=hca
        if(not os.path.isfile(self.path)):
            f=open(self.path,'w')
            f.write('{}')
            f.close()
        f=open(self.path,'r')
        self.dataUsers=json.loads(f.read())
        f.close()

    #Save users data
    def save(self):
        f=open(self.path,'w')
        f.write(json.dumps(self.dataUsers))
        f.close()

    #Add new user
    def addUser(self,chatId,userId):
        addTime=int(timelib.time())
        userInfo={
            'chatId':chatId,
            'userId':userId,
            'createTime':addTime,
            'isActive':True,
            'lastActivity':addTime,
            'isAdmin':0,
            'menu':'default_user'
        }
        self.dataUsers[chatId]=userInfo
        self.save()

    #If user is finded return info else None
    def getUser(self,chatId):
        if chatId in self.dataUsers:
            return self.dataUsers[chatId]
        return None

    #unsubscribe news
    def unsub(self,chatId):
        if chatId in self.dataUsers:
            self.dataUsers[chatId]["lastActivity"]=int(timelib.time())
            self.dataUsers[chatId]["menu"]="start_menu"
            self.dataUsers[chatId]["isActive"]=False
            self.save()
            return True
        return False

    #subscribe news
    def sub(self,chatId):
        if chatId in self.dataUsers:
            self.dataUsers[chatId]["lastActivity"]=int(timelib.time())
            self.dataUsers[chatId]["menu"]="default_user"
            self.dataUsers[chatId]["isActive"]=True
            self.save()
            return True
        return False

    #set menu for user
    def setMenu(self,chatId,menu):
        if chatId in self.dataUsers:
            self.dataUsers[chatId]["lastActivity"]=int(timelib.time())
            self.dataUsers[chatId]["menu"]=menu
            self.save()
            return True
        return False

    def sendNews(self,message,attachments):
        print('Рассылка стартовала')
        for chatId,data in self.dataUsers.items():
            if data['isActive']==True:
                self.hca.sendMessage(chatId,message,attachments=attachments)
        print('Рассылка завершена')

users=BotUsers(hca)

#On new message
@hca.event('onNewMessage')
def on_new_message(msg,isExistPassword):
    if not isExistPassword:
        hca.requestPassword(msg['fromChat'])
        return
    chatId=str(msg['fromChat'])
    user=users.getUser(chatId)
    message=msg['message']
    if(user is None):
        if(message=='/старт'):
            hca.setMenu(chatId,menu_bot["default_user"])
            users.addUser(chatId,msg['fromId'])
            hca.sendMessage(chatId,'Вы подписались на рассылку новостей об экологии')
            return
        hca.setMenu(chatId,menu_bot["start_menu"])
        hca.sendMessage(chatId,'Отправьте команду /старт для активации бота')
        return
    if message=='/старт':
        hca.setMenu(chatId,menu_bot["default_user"])
        users.sub(chatId)
        hca.sendMessage(chatId,'Вы подписались на рассылку новостей об экологии')
        return
    elif message=='/о нас':
        hca.sendMessage(chatId,'Делал бота ~halwarsing')
        return
    elif message=='/отписаться':
        users.unsub(chatId)
        hca.setMenu(chatId,menu_bot["start_menu"])
        hca.sendMessage(chatId,'Как жаль что вы от нас уходите, возвращайтесь как можно раньше!')
        return

    if user['isAdmin']==1:
        if user['menu']=='default_user':
            hca.setMenu(chatId,menu_bot["admin_user"])
            users.setMenu(chatId,"admin_user")
            return
            
        if message=='/новость':
            if(msg['answerMsg']!='-1'):
                answerMsg=hca.getMessage(chatId,msg['answerMsg'])
                if(answerMsg is None):
                    hca.sendMessage(chatId,"Ошибка")
                    return
                hca.sendMessage(chatId,"Новость опубликована")
                users.sendNews(answerMsg['message'],answerMsg['attachments'])
                return
        elif message=='/помощь':
            hca.sendMessage(chatId,"""Вот команды админа:
/новость - нужно написать сообщение которое будет всем разослоно, затем нажать ответить на него и написать эту команду""")
            return    
    hca.sendMessage(chatId,'Я не понял команду')

#When bot invited to new chat
@hca.event('onNewChat')
def on_new_chat(chatId,inviteId):
    hca.requestPassword(chatId)
    hca.setMenu(chatId,menu_bot["start_menu"])

#When bot get password from chat
@hca.event('onReceivePassword')
def on_receive_password(chatId,password):
    if (users.getUser(chatId) is None):
        hca.setMenu(chatId,menu_bot["start_menu"])
        hca.sendMessage(chatId,'Отправьте команду /старт для активации бота')
    
#Click button in message
@hca.event('onClickButton')
def on_click_button(chatId,fromId,fromMsg,button):
    print(button,fromMsg)

#messaging between bot and another bots or applications connected to the HalChat chat
@hca.event('onBotMessage')
def on_bot_message(fromId,time,data):
    print('bot message')

hca.run()

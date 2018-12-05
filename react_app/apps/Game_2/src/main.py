import precode2 as pc 
import pygame as pg
import random

class Flyer():
    def draw(self, window, color, pos, pos1, pos2):
        pg.draw.polygon(window, color, [self.pos.as_point,(self.pos + self.pos1).as_point,(self.pos + self.pos2).as_point], 2)

    def move(self, pos, pos1, pos2, speed):
        try:
            self.pos1 = self.speed.normalized().rotate(195)*20
            self.pos2 = self.speed.normalized().rotate(165)*20
            

        except ZeroDivisionError:
            print("ZeroDivisionError in Flyer.move function")

    def speedlim(self):
        if abs(self.speed) > self.speedlimit:
            self.speed = (self.speed / abs(self.speed)) * self.speedlimit
        if abs(self.speed) < self.speedlowest:
            self.speed = (self.speed / abs(self.speed)) * self.speedlowest
    
    def dired(self):
        self.dir += self.speed
        if abs(self.dir)>self.speedlimit:
            self.dir = self.dir.normalized() * self.speedlimit
        self.pos += self.dir

    def separation(self, li):           #avoiding themself
        vec = pc.Vector2D(0,0)
        for i in li:
            diff = (i.pos - self.pos)
            if abs(diff) < 25:
                vec -= diff
        return vec

    def separationobject(self, li):      #avoiding Object
        vec = pc.Vector2D(0,0)
        for i in li:
            diff = (i.senter - self.pos)
            if abs(diff) < 70:
                vec -= diff
        return vec/20

    def fam(self, li):
        new_list = []
        new_list.append(self)
        for i in li:
            hit = pc.intersect_circles(self.pos, self.rad, i.pos,i.rad)
            if hit:
                new_list.append(i)
        return new_list

class Boids(Flyer):
    def __init__(self, x, y):
        self.pos = pc.Vector2D(x,y)
        self.pos1 = pc.Vector2D(40, 40)
        self.pos2 = pc.Vector2D(25, 50)
        self.color = [100,0,255]
        self.speed = pc.Vector2D(random.randint(-5,5),random.randint(-5,5))
        self.speedlimit = 6
        self.speedlowest = 3
        self.dir = self.speed
        self.rad = 100
        self.killrad = 20
        
    def add(self, l1, l2, l3, l4, l5):
        self.speed += (l1 + l2 + l3 + l4 + l5)
        self.speedlim()
        self.dired()

    def fam_add(window, li, ob_li, ho_li):
        for i in li:
            v1 = i.cohesion(li)
            v2 = i.separation(li)/70
            v3 = i.alignment(li)
            v4 = i.separationobject(ob_li)  #object list
            v5 = i.separation(ho_li)/10     #hoiks list
            i.add(v1,v2,v3,v4,v5)

    def cohesion(self, li):
        vec = pc.Vector2D(0,0)
        new_list = self.fam(li)
        for i in new_list:
            vec += i.pos
        vec = (vec / len(new_list))
        vec = (vec - self.pos)
        return vec / 300
    
    def alignment(self, li):
        vec = pc.Vector2D(0,0)
        new_list = self.fam(li)
        for i in new_list:
            vec += (i.speed)
        vec = vec / (len(new_list))
        vec = vec - self.speed
        return vec / 20

class Hoiks(Flyer):
    def __init__(self, x, y):
        self.pos = pc.Vector2D(x, y)
        self.pos1 = pc.Vector2D(40,40)
        self.pos2 = pc.Vector2D(25, 50)
        self.color = [255,0,0]
        self.speed = pc.Vector2D(random.randint(-5,5),random.randint(-5,5))
        self.speedlimit = 6.5
        self.speedlowest = 5
        self.dir = self.speed
        self.rad = 200
        self.killrad = 1

    def hoikslist(window, hoikslist, boidslist, objectlist):
        for i in hoikslist:
            li = i.fam(boidslist)
            target = i.nearby(li)
            v1 = i.separation(hoikslist)
            v2 = i.separationobject(objectlist)
            i.add(target.pos,v1,v2)
            i.kill(target, boidslist)

    def nearby(self, li):
        near = li[0]
        for i in li:
            dis = (abs(i.pos - self.pos))
            if abs(near.pos) > dis:
                near = i
        return near

    def add(self, tar_pos, v1, v2):
        new_x = tar_pos.x - self.pos.x
        new_y = tar_pos.y - self.pos.y
        new_vec = pc.Vector2D(new_x,new_y)
        self.speed += new_vec + v1 + v2
        self.speedlim()
        self.dired()

    def kill(self, tar, targetlist):
        if pc.intersect_circles(self.pos, self.killrad, tar.pos, tar.killrad):
            targetlist.remove(tar)

class Object():
    def __init__(self, x, y):
        self.size = [50,50]
        self.pos = pc.Vector2D(x-self.size[0]/2,y - self.size[1]/2)
        self.color = [34,255,145]
        self.speed = pc.Vector2D(0,0)
        self.senter = pc.Vector2D((self.pos.x + (self.size[0]/2)),(self.pos.y + (self.size[1]/2))) #senter of the box, not top left corner
    
    def draw(self, window, color, x, y):
        pg.draw.rect(window, color, [x] + [y] + self.size)

class FlyerList():
    def __init__(self):
        self.boids = []
        self.hoiks = []
        self.object = []

    def new_boids(self, x, y):
        self.boids.append(Boids(x, y))
        
    def new_hoiks(self, x, y):
        self.hoiks.append(Hoiks(x, y))

    def new_object(self, x, y):
        self.object.append(Object(x, y))

    def move_all(self):
        for i in self.boids:
            i.move(i.pos, i.pos1, i.pos2, i.speed)
        for i in self.hoiks:
            i.move(i.pos, i.pos1, i.pos2, i.speed)

    def draw_all(self, window):
        for i in self.boids:
            i.draw(window, i.color, i.pos, i.pos1, i.pos2)
        for i in self.hoiks:
            i.draw(window, i.color, i.pos, i.pos1, i.pos2)
        for i in self.object:
            i.draw(window, i.color, i.pos.x, i.pos.y)

    def walls(self, screen_dim):
        for i in self.boids:
            if i.pos.x <= 0:
                i.pos.x = screen_dim[0] - 50
            if i.pos.x >= screen_dim[0]:
                i.pos.x = 0
            if i.pos.y <= 0:
                i.pos.y = screen_dim[1] - 50
            if i.pos.y >= screen_dim[1]:
                i.pos.y = 0
        for i in self.hoiks:
            if i.pos.x <= 0:
                i.pos.x = screen_dim[0] - 50
            if i.pos.x >= screen_dim[0]:
                i.pos.x = 0
            if i.pos.y <= 0:
                i.pos.y = screen_dim[1] - 50
            if i.pos.y >= screen_dim[1]:
                i.pos.y = 0

class Game():
    def __init__(self):
        pg.display.set_caption("Haiken kommer!")
        self.fps = 45
        self.clock = pg.time.Clock()
        self.screen_dim = [1200, 400] 
        self.window = pg.display.set_mode(self.screen_dim)
        self.Main()

    def Main(self):
        pg.init()
        flyerlist = FlyerList()
        bo = True                         #boids
        ho = False                        #hoiks
        obj = False                       #object
        while 1:
            for event in pg.event.get():
                if event.type == pg.QUIT:
                    exit()
                if event.type == pg.KEYDOWN:
                    if event.key == pg.K_q or event.key == pg.K_ESCAPE:
                        exit()
                    if event.key == pg.K_1:     #boids
                        bo = True
                        ho = False
                        obj = False
                    if event.key == pg.K_2:     #hoiks
                        bo = False
                        ho = True
                        obj = False
                    if event.key == pg.K_3:     #object
                        bo = False
                        ho = False
                        obj = True 
                    if event.key == pg.K_r:     #restart
                        Game()

                if event.type == pg.MOUSEBUTTONDOWN:
                    if bo:
                        x,y = pg.mouse.get_pos()
                        flyerlist.new_boids(x,y)
                    if ho:
                        x ,y = pg.mouse.get_pos()
                        flyerlist.new_hoiks(x,y)
                    if obj:
                        x ,y = pg.mouse.get_pos()
                        flyerlist.new_object(x,y)        
                        
            self.window.fill((50, 100, 250))

            flyerlist.draw_all(self.window)
            flyerlist.move_all()
            flyerlist.walls(self.screen_dim)
        
            Boids.fam_add(self.window, flyerlist.boids, flyerlist.object, flyerlist.hoiks)
            Hoiks.hoikslist(self.window, flyerlist.hoiks, flyerlist.boids, flyerlist.object)

            self.clock.tick(self.fps)
            pg.display.update()



if __name__ == "__main__":
    Game()
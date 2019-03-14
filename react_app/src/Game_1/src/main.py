import pygame as pg
import precode2 as pc
from config import *
import abc
import math
import randomz

class Object(pg.sprite.Sprite):
    """class for all visible objects"""
    def __init__(self):
        pg.sprite.Sprite.__init__(self)
        self.image

class Player(Object):
    """contains all attributes and methods for players(spaceships)"""
    def __init__(self, key1, key2, key3, key4, image, score):    
        pg.sprite.Sprite.__init__(self)
        self.dir = 0
        self.score = score
        self.fuel = FUELTANK_SIZE
        self.speed = pc.Vector2D(0,0)
        self.orgimage = pg.image.load(image)
        self.image = pg.image.load(image)
        self.rect = self.image.get_rect()
        self.tip = self.rect.top + 50
        self.key1 = key1
        self.key2 = key2
        self.key3 = key3 
        self.key4 = key4
        self.timeshot = 0

    def collision_player(self, playergroup):
        """collision between other players"""
        for n in playergroup:
            if self != n:
                if pg.sprite.collide_mask(self, n):
                    self.score -= SCORE_COLLISION
                    n.score -= SCORE_COLLISION
                    n.reborn(playergroup)
                    self.reborn(playergroup)

    def collision_obs(self, playergroup, obsgroup):
        """collision between players and obstacles"""
        for n in obsgroup:
            if pg.sprite.collide_mask(self, n):
                self.score -= SCORE_COLLISION
                self.reborn(playergroup)

    def collision_shoot(self, playergroup, shootgroup1, shootgroup2):
        """when one player gets hit with the bullet of another player"""
        for i in playergroup:
            if self.key1 == P1_KEY_ENGINE:
                for n in shootgroup2:
                    if pg.sprite.collide_mask(self, n):
                        if i != self:   
                            i.score += SCORE_HIT
                            self.reborn(playergroup)
            if self.key1 == P2_KEY_ENGINE:
                for n in shootgroup1:
                    if pg.sprite.collide_mask(self, n):
                        if i != self:
                            i.score += SCORE_HIT
                            self.reborn(playergroup)

    def reborn(self, playergroup):
        """revive players after collsion or been shot"""
        if self.key1 == P1_KEY_ENGINE:
            score = self.score
            playergroup.remove(self)
            player1 = Player(P1_KEY_ENGINE, P1_KEY_LEFT, P1_KEY_RIGHT, P1_KEY_SHOOT, "ship.png", score)
            player1.rect.x += SCREEN_WIDTH - 50
            playergroup.add(player1)
        if self.key1 == P2_KEY_ENGINE:
            score = self.score
            playergroup.remove(self)
            player2 = Player(P2_KEY_ENGINE, P2_KEY_LEFT, P2_KEY_RIGHT, P2_KEY_SHOOT, "ship2.png", score)
            playergroup.add(player2)

    def gravity(self):
        """gravity to pull the objects down"""
        self.speed.y += 0.07

    def screen(self):
        """boundaries for screen"""
        if self.rect.left > SCREEN_WIDTH:
            self.rect.right = 0
        if self.rect.right < 0:
            self.rect.left = SCREEN_WIDTH
        if self.rect.bottom > SCREEN_HEIGHT:
            self.rect.bottom = SCREEN_HEIGHT
            self.speed.y = 0
        if self.rect.top < 0:
            self.rect.top = 0
            self.speed.y = 0

    def constantly_moving(self):
        """makes objects constantly move"""
        unewx = -self.speed.x / 40
        unewy = -self.speed.y / 40
        self.speed.x += unewx
        self.speed.y += unewy
        self.rect.x += self.speed.x
        self.rect.y += self.speed.y
    
    def engine(self):
        """controls fuel tank and makes object move"""
        if self.fuel > 0:
            self.speed += self.move()
            self.fuel -= FUEL_LOOSE

    def move(self):
        """find direction and move thereafter"""
        angle = self.dir % 360 + 90
        rad = angle*(math.pi / 180)
        newx =  math.cos(rad) * 0.7
        newy = -math.sin(rad) * 0.7
        self.speed = pc.Vector2D(newx,newy)
        return self.speed

    def rotate(self):
        """makes the image rotate"""
        centerrect = self.rect.center
        self.image = pg.transform.rotate(self.orgimage, self.dir)
        self.rect = self.image.get_rect()
        self.rect.center = centerrect

    def rotateleft(self):
        """change the rotation of direction to the left"""
        self.dir += 4

    def rotateright(self):
        """change the rotation of direction to the right"""
        self.dir -= 4

    def keys(self, shootgroup1, shootgroup2):
        """create controlls for players"""
        keys = pg.key.get_pressed()

        if keys[self.key1]:             #forwards
            self.engine()
        if keys[self.key2]:             #moves left
            self.rotateleft()
        if keys[self.key3]:             #moves right
            self.rotateright()
        if keys[self.key4]:             #shoot
            self.shoot(shootgroup1, shootgroup2)
        if keys[pg.K_ESCAPE]:           #exit the game
            exit()
        if keys[pg.K_r]:                #restart the game
            Game()

    def rapitfire(self, time):
        """decrease rate of fire"""
        diff = time - self.timeshot
        if diff > 500:
            return True

    def shoot(self, shootgroup1, shootgroup2):
        """creates bullets for players to shot"""
        time = pg.time.get_ticks()
        if self.key1 == P1_KEY_ENGINE:
            if self.rapitfire(time):
                shot = Shot("bullet.png", self.dir, self.rect, BULLET_SIZE)
                shootgroup1.add(shot)
                self.timeshot = pg.time.get_ticks()
        if self.key1 == P2_KEY_ENGINE:
            if self.rapitfire(time):
                shot = Shot("bullet2.png", self.dir, self.rect, BULLET_SIZE)
                shootgroup2.add(shot)
                self.timeshot = pg.time.get_ticks()

    def update(self, playergroup, shootgroup1, shootgroup2, obsgroup):
        """updates all methods for player class"""
        self.keys(shootgroup1, shootgroup2)
        self.constantly_moving()
        self.rotate()
        self.gravity()
        self.collision_obs(playergroup, obsgroup)
        self.collision_shoot(playergroup, shootgroup1, shootgroup2)
        self.collision_player(playergroup)
        self.screen()

class Gun(abc.ABC, Object):
    """abstract class"""
    @abc.abstractmethod
    def __init__(self, image, di, rect, scale):
        pass

    @abc.abstractmethod
    def move(self):
        pass

    @abc.abstractmethod
    def constantly_moving(self):
        pass

    @abc.abstractmethod
    def screen(self, shootgroup):
        pass

    @abc.abstractmethod
    def update(self, playergroup, shootgroup, brickgroup, obsgroup):
        pass

class Shot(Gun):
    """class for bullets"""
    def __init__(self, image, di, rect, scale):
        pg.sprite.Sprite.__init__(self)
        self.image = pg.image.load(image)
        self.size = self.image.get_size()
        self.image = pg.transform.scale(self.image,(int(self.size[0]/scale), int(self.size[1]/scale)))
        self.rect = rect
        self.color = [255,255,255]
        self.speed = pc.Vector2D(0,0)
        self.dir = di

    def move(self):
        """makes bullets move"""
        angle = self.dir % 360 + 90
        rad = angle*(math.pi / 180)

        newx =  math.cos(rad) * 20
        newy = -math.sin(rad) * 20

        self.speed = pc.Vector2D(newx,newy)
        return self.speed

    def constantly_moving(self):
        """makes bullets constantly move"""
        self.rect.x += self.speed.x
        self.rect.y += self.speed.y

    def screen(self, shootgroup1, shootgroup2):
        """removes bullets from groups when outside screen"""
        if self.rect.left    > SCREEN_WIDTH  and \
            self.rect.right  < 0             and \
            self.rect.top    > SCREEN_HEIGHT and \
            self.rect.bottom < 0:
            shootgroup1.remove(self)
            shootgroup2.remove(self)

    def update(self, shootgroup1, shootgroup2):
        """update all methods concerning bullets(shot)"""
        self.move()
        self.constantly_moving()
        self.screen(shootgroup1, shootgroup2)
        
class Obs(Object):
    """class for obstacles with attributes and methods"""
    def __init__(self, image, scale):
        pg.sprite.Sprite.__init__(self)
        self.image = pg.image.load(image)
        self.rect = self.image.get_rect()
        self.size = self.image.get_size()
        self.image = pg.transform.scale(self.image,(int(self.size[0]/scale), int(self.size[1]/scale)))

    def hit(self, shootgroup1, shootgroup2):
        """ checks if bullets hits obstacles and removes from group"""
        pg.sprite.spritecollide(self, shootgroup1, True)
        pg.sprite.spritecollide(self, shootgroup2, True)

    def update(self, shootgroup1, shootgroup2):
        """update obstacle"""
        self.hit(shootgroup1, shootgroup2)
 
class Mapit():
    """contains scoreboards for players"""
    def scoreboard1(self, screen, player_score1, player_fuel1):
        font = pg.font.Font(None, TEXT_SIZE)
        screen.blit(font.render("Score: %d" %player_score1 ,50,(PINK)), (10,10))
        screen.blit(font.render("Fuel: %d" %player_fuel1 ,50,(PINK)), (10,40))

    def scoreboard2(self, screen, player_score2, player_fuel2):
        font = pg.font.Font(None, TEXT_SIZE)
        screen.blit(font.render("Score: %d" %player_score2 ,50,(WHITE)), (1020,10))
        screen.blit(font.render("Fuel: %d" %player_fuel2 ,50,(WHITE)), (1020,40))

class Fuel(Object):
    """class for fuelbarrels with attributes and methods"""
    def __init__(self, image):
        pg.sprite.Sprite.__init__(self)
        self.image = pg.image.load(image)
        self.rect = self.image.get_rect()

    def addfuel(self, i):
        """add fuel to players fueltanks"""
        i.fuel += FUEL_ADD

    def spawnfuel(self, fuelgroup):
        """creates new fuelbarrel when another fuelbarrel is removed"""
        fuel = Fuel("powerupGreen_bolt.png")
        fuel.rect.x = random.randint(0, SCREEN_WIDTH-50)
        fuel.rect.y = random.randint(0, SCREEN_HEIGHT-50)
        fuelgroup.add(fuel)
    
    def playerhit(self, fuelgroup, playergroup):
        """ when a player hits a fuelbarrel it gains fuel and removes fuelbarrel"""
        for i in playergroup:
            if pg.sprite.spritecollide(i, fuelgroup, True):
                self.spawnfuel(fuelgroup)
                self.addfuel(i)

    def update(self, fuelgroup, playergroup):
        """update all methods for fuel"""
        self.playerhit(fuelgroup, playergroup)

class Game():
    """class for gmae with all attributes and methods"""
    def __init__(self):
        pg.display.set_caption("MAYHEM CLONE")
        self.fps = 60
        self.clock = pg.time.Clock()
        self.screen_dim = SCREENSIZE 
        self.window = pg.display.set_mode(self.screen_dim)
        self.Main()

    def startgame(self, playergroup, obsgroup, fuelgroup):
        """setup for the game"""
        player1 = Player(P1_KEY_ENGINE, P1_KEY_LEFT, P1_KEY_RIGHT, P1_KEY_SHOOT, "ship.png", 0)
        player1.rect.x += SCREEN_WIDTH - 50
        playergroup.add(player1)

        player2 = Player(P2_KEY_ENGINE, P2_KEY_LEFT, P2_KEY_RIGHT, P2_KEY_SHOOT, "ship2.png", 0)
        playergroup.add(player2)

        for i in range(3):
            fuel = Fuel("powerupGreen_bolt.png")
            fuel.rect.x = random.randint(0, SCREEN_WIDTH-50)
            fuel.rect.y = random.randint(0, SCREEN_HEIGHT-50)
            fuelgroup.add(fuel)

            obs = Obs("meteorGrey_big1.png",random.randint(1,3))
            obs.rect.x = random.randint(0,SCREEN_WIDTH-50)
            obs.rect.y = random.randint(0,SCREEN_HEIGHT-50)
            obsgroup.add(obs)

    def Main(self):
        """create and update all object groups. Calls all methods and execute"""
        pg.init()
        playergroup = pg.sprite.Group()
        shootgroup1 = pg.sprite.Group()
        shootgroup2 = pg.sprite.Group()
        obsgroup = pg.sprite.Group()
        fuelgroup = pg.sprite.Group()

        Game.startgame(self, playergroup, obsgroup, fuelgroup)
        mapit = Mapit()

        while True:
            for event in pg.event.get():
                if event.type == pg.QUIT:
                    exit()
                        
            self.window.fill(BLACK)

            obsgroup.draw(self.window)
            obsgroup.update(shootgroup1, shootgroup2)

            fuelgroup.draw(self.window)
            fuelgroup.update(fuelgroup, playergroup)

            playergroup.draw(self.window)
            playergroup.update(playergroup, shootgroup1, shootgroup2, obsgroup)
            
            shootgroup1.draw(self.window)
            shootgroup1.update(shootgroup1, shootgroup2)

            shootgroup2.draw(self.window)
            shootgroup2.update(shootgroup1, shootgroup2)
            
            for i in playergroup:
                if i.key1 == P2_KEY_ENGINE:
                    mapit.scoreboard1(self.window, i.score, i.fuel)
                if i.key1 == P1_KEY_ENGINE:
                    mapit.scoreboard2(self.window, i.score, i.fuel)

            self.clock.tick(self.fps)
            pg.display.update()

if __name__ == "__main__":
    Game()
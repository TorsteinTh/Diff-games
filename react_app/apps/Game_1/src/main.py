import pygame as pg
import precode as pc                    #imports the other file that is used
import random                           #imports the random function to make random colors on the boxes

'''creates a window, with name and fps'''
screen_dim = [700 , 1000]               
pg.init()
window = pg.display.set_mode(screen_dim)
pg.display.set_caption("Breakout")
fps = 100
clock = pg.time.Clock()

'''classes'''
class Square():
    def __init__(self, window, x, y):
        self.dim = [60, 30]             #size of box  [0]=width  [1]=height
        self.color = [random.randint(200,250),random.randint(54,155),random.randint(240,255)]
        self.pos = pc.Vector2D(x,y)
        self.window = window

    def draw(self): 
        pg.draw.rect(window, self.color, [self.pos.x] + [self.pos.y] + self.dim) 
    

class Ball():
    def __init__(self):
        self.pos = pc.Vector2D((screen_dim[0]/2),(screen_dim[1]/2))             #place the ball in the senter of the screen
        self.rad = 10
        self.speed = pc.Vector2D(1,8)                                           
        self.color = [255, 255, 255] 
    
    def moveball(self):
        self.pos.x += self.speed.x
        self.pos.y += self.speed.y
    
    def draw(self):  
        pg.draw.circle(window, self.color, (int(self.pos.x), int(self.pos.y)), self.rad)

    '''Crash function between player and the boxes(square)'''
    def crash(self, square): 
        if pc.intersect_rectangle_circle(square.pos, square.dim[0], square.dim[1], ball.pos, ball.rad, ball.speed):
            ball.speed =  pc.intersect_rectangle_circle(square.pos, square.dim[0], square.dim[1], ball.pos, ball.rad, ball.speed) * abs(ball.speed)
            return True
    
    '''Crash function between the player and the ball'''
    def playerhit(self): 
        if pc.intersect_rectangle_circle(player.pos, player.dim[0], player.dim[1], ball.pos, ball.rad, ball.speed):
            padball = pc.intersect_circles(pc.Vector2D(player.pos.x + player.dim[0] / 2, player.pos.y + 110),player.dim[0],ball.pos, ball.rad)
            ball.speed = padball * abs(ball.speed)

    '''stops the ball and show the winning screen'''
    def win(self):
        ball.speed.x = 0
        ball.speed.y = 0
        player.speedplayer = [0,1]
        font = pg.font.Font(None, 150)
        window.blit(font.render("YOU WON", 50, (255,200,255)),(110,200))
        fonte = pg.font.Font(None, 30)
        window.blit(fonte.render("PRESS 'R' TO RESTART THE GAME", 30, (255,130,255)),(200,350))
        fonte = pg.font.Font(None, 30)
        window.blit(fonte.render("PRESS 'Q' or 'Esc' TO QUIT THE GAME", 30, (255,130,255)),(180,400))

    '''The start page, lets the player decide then to start'''
    def start(self):
        font = pg.font.Font(None, 50)
        window.blit(font.render("PRESS SPACEBAR TO START", 30, (255,130,255)),(120,450))


class Player():
    def __init__(self):
        self.dim = [160, 10]        #size of player [0]=width  [1]=height
        self.color = [255,100,150]
        self.pos = pc.Vector2D(((screen_dim[0]/2) - (self.dim[0]/2)),((screen_dim[1] - self.dim[1]))) 
        self.speedplayer = [7,7]
       
    def moveright(self):
        self.pos.x += self.speedplayer[0]

    def moveleft(self):
        self.pos.x -= self.speedplayer[1]

    def draw(self):  
        pg.draw.rect(window, self.color, [self.pos.x] + [self.pos.y] + self.dim)

'''end of classes'''
    
    





'''standard values declared before the main loop starts'''
ball = Ball()
player = Player()
k_up = False
k_down = False
k_right = False
k_left = False
activeball = False

'''makes a list with all the coordinates to the boxes'''
coloumns = 5
rows = 10
boxlist = []
box_x = 5                                               #start coordinates values
box_y = 10 
for i in range(coloumns):
    for j in range(rows):
        boxlist.append(Square(window,box_x,box_y))    
        box_x += boxlist[0].dim[0] + 10
    box_x = 5
    box_y += boxlist[1].dim[1] + 10 









'''Main!'''

if __name__ == "__main__":
    while True:
        window.fill((30, 10, 50))                                            #background color

        '''start of key function'''
        for event in pg.event.get():
            
            if event.type == pg.QUIT:
                exit()

            if event.type == pg.KEYDOWN: 
                if event.key == pg.K_q or event.key == pg.K_ESCAPE:         #quits the game
                    exit()
                if event.key == pg.K_LEFT:                                  #controls the player
                    k_left = True
                if event.key == pg.K_RIGHT:
                    k_right = True
                if event.key == pg.K_SPACE:                                 #starts the game
                    activeball = True
                if event.key == pg.K_r:                                     #restart the game, puts every value that have been changed back to start values
                    activeball = False
                    ball.speed = pc.Vector2D(1,8)
                    ball.pos = pc.Vector2D(int(screen_dim[0]/2),(int(screen_dim[1]/2)))
                    player.pos = pc.Vector2D(int((screen_dim[0]/2) - (player.dim[0]/2)),int((screen_dim[1] - player.dim[1])))
                    player.speedplayer = [8,8] 
                    boxlist = []
                    box_x = 5                                               #creats a new and full list
                    box_y = 10 
                    for i in range(coloumns):
                        for j in range(rows):
                            boxlist.append(Square(window,box_x,box_y))
                            box_x += boxlist[0].dim[0] + 10 
                        box_x = 5
                        box_y += boxlist[1].dim[1] + 10
                if event.key == pg.K_y:                                     #cheatkey to autowin
                    boxlist = []
                    ball.win()

            if event.type == pg.KEYUP:                                      #stops the player if not key is pressed
                if event.key == pg.K_LEFT:
                    k_left = False
                if event.key == pg.K_RIGHT:
                    k_right = False
        '''end of key function'''




        if ball.pos.x > screen_dim[0] or ball.pos.x < 0:                    #bounces the ball of the walls             
            ball.speed.x *= -1
        if ball.pos.y > screen_dim[1] or ball.pos.y < 0:
            ball.speed.y *= -1

        if ball.pos.y > screen_dim[1]:                                      #loses when the ball hits the floor
            print("You lost!")
            quit()                                      
        
        if k_right and player.pos.x + player.dim[0] < screen_dim[0]:        #controls the player, and limits to move it more than the screen
            player.moveright()
        if k_left and player.pos.x > 0:                                 
            player.moveleft()
         
        if activeball == False:             #show the startscreen if not started
            ball.start()
        if activeball:                      #sjekker hvis ball er aktiv
            ball.moveball()
            

        '''removes the boxes(square)'''
        hit_box = False                   
        for i in boxlist:                   #iterates trough the list
            i.draw()                        #draws the boxes in the list
            if ball.crash(i) == True:
                hit_box = True              #removes the box outside the (for-loop) to make it smoother
                tmp = i                     #holds the coordinates of the current hitted box 

        if hit_box:                         #if the ball hits a box, it removes the current hitted box 
            boxlist.remove(tmp)

        if not boxlist:                     #if list is empty you win
            ball.win()


        ball.playerhit()                    #bounces the ball if it hits the player
        ball.draw()                         #draws the player and ball
        player.draw()

        pg.display.update()                 #updates the screenS
        clock.tick(fps)

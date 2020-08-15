# script: ship

extends Area2D

var armor = 4 setget set_armor

# timer entre os tiros
var shoot_timer = null
var can_shoot = true
var shoot_delay = 0.2

const scn_laser = preload("res://stages/laser_ship.tscn")
const scn_explosion = preload("res://stages/explosion.tscn")

func _ready():
	set_shoot_timer()
	set_process(true)
	add_to_group("ship")
	pass

# timer pro tiro
func set_shoot_timer():
	shoot_timer = Timer.new()
	shoot_timer.set_one_shot(true)
	shoot_timer.set_wait_time(shoot_delay)
	shoot_timer.connect("timeout", self, "on_timeout_complete")
	add_child(shoot_timer)

# passado o timeout, pode atirar
func on_timeout_complete():
	can_shoot = true
	
# inicia o timer pro proximo tiro
func starts_shoot_timer():
	can_shoot = false
	shoot_timer.start()
	
func _process(delta):
	
	var pos_x = position.x
	
	if Input.is_action_pressed("ui_left"):
		pos_x -= 8 
	if Input.is_action_pressed("ui_right"):
		pos_x += 8
	if Input.is_action_pressed("ui_shoot") && (can_shoot):
		shoot()

	if pos_x >= 8 && pos_x <= 172: 
		# trakink the mouse
		var motion = (pos_x - position.x) * 0.2
		translate(Vector2(motion, 0))
	
	# claping the view
	# var view_size = get_viewport_rect().size
	# var pos = position
	# pos.x = clamp(pos.x, 0+16, view_size.x-16)
	# position = pos
	pass

func shoot():
	var pos = get_node("cannon/cannon_pos").get_global_position()
	create_laser(pos)
	starts_shoot_timer()

func create_laser(pos):
	var laser = scn_laser.instance()
	laser.position = position
	#var root = get_tree().get_root()
	#var node = root.get_child( root.get_child_count()-1)
	get_tree().get_root().add_child(laser)
	pass
	
func set_armor(new_value):
	armor = new_value
	if armor <= 0: 
		queue_free()
	pass

extends Area2D

export var armor = 4 setget set_armor
export var velocity = Vector2()
const scn_explosion = preload("res://stages/explosion.tscn")

func _ready():
	set_process(true)
	add_to_group("enemy")
	pass

var increment = 1

func _process(delta):
	var portion = rand_range(3, 8)
	translate((velocity * delta) / portion)
	
	if position.x-16 >= get_viewport_rect().size.x - 32:
		increment *= -1
	
	if position.x+16 <= 32:
		increment *= -1
	
	position.x += increment
	
	if position.y-16 >= get_viewport_rect().size.y:
		queue_free()
	pass

func set_armor(new_value):
	armor = new_value
	if armor <= 0: 
		create_explosion()
		queue_free()
	pass
	
func create_explosion():
	var explosion = scn_explosion.instance()
	explosion.position = position
	get_tree().get_root().add_child(explosion)
	pass

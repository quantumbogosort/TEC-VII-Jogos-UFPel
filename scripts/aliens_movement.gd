extends Node

const alien_enemy = preload("res://stages/alien_enemy.tscn")

func _ready():
	spawn()
	pass

func spawn():
	while true:
		randomize()
		
		var alien = alien_enemy.instance()

		var pos = Vector2()
		
		pos.x = rand_range(0+16, get_viewport().get_visible_rect().size.x-16)
		pos.y = 0-16
		
		alien.position = pos

		get_node("container").add_child(alien)
		yield(get_tree().create_timer(rand_range(2, 5)), "timeout")
	pass

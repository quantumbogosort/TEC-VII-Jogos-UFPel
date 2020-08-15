extends Node

const rock_enemy = preload("res://stages/rock.tscn")

func _ready():
	spawn()
	pass

func spawn():
	while true:
		randomize()
		
		var rock = rock_enemy.instance()
		
		var pos = Vector2()
		
		pos.x = rand_range(0+16, get_viewport().get_visible_rect().size.x-16)
		pos.y = 0-16
		
		rock.position = pos
		
		get_node("container").add_child(rock)
		yield(get_tree().create_timer(rand_range(4, 7)), "timeout")
	pass

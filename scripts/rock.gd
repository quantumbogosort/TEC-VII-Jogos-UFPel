extends Area2D

export var armor = 3 setget set_armor
export var velocity = Vector2()

func _ready():
	set_process(true)
	add_to_group("enemy")
	pass

func _process(delta):
	var portion = rand_range(3, 8)
	translate((velocity * delta) / portion)
	
	if position.y-16 >= get_viewport_rect().size.y:
		queue_free()
	pass

func set_armor(new_value):
	armor = new_value
	if armor <= 0: 
		get_node("rock_1").texture = load("res://sprites/explosion.png")
		queue_free()
	pass

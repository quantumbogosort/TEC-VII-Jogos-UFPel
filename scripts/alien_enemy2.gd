extends Area2D

export var velocity = Vector2()

func _ready():
	set_process(true)
	pass

var increment = -1

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

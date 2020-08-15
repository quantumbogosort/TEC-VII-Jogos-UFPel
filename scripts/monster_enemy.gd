extends Area2D

export var velocity = Vector2()

func _ready():
	set_process(true)
	pass

func _process(delta):
	var portion = rand_range(3, 8)
	translate((velocity * delta) / portion)
	
	var increment = rand_range(-20, 20)
	
	if position.x-16 >= get_viewport_rect().size.x - 32:
		increment = -10
	
	if position.x+16 <= 32:
		increment = 10
	
	position.x += increment
	
	if position.y-16 >= get_viewport_rect().size.y:
		queue_free()
	pass

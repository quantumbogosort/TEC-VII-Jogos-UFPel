# script: ship

extends Area2D

func _ready():
	set_process(true)
	pass

func _process(delta):
	
	var pos_x = position.x
	
	if Input.is_action_pressed("ui_left"):
		pos_x -= 8 
	if Input.is_action_pressed("ui_right"):
		pos_x += 8
	
	if pos_x >= -80 && pos_x <= 80: 
		# trakink the mouse
		var motion = (pos_x - position.x) * 0.2
		translate(Vector2(motion, 0))
	
	# claping the view
	# var view_size = get_viewport_rect().size
	# var pos = position
	# pos.x = clamp(pos.x, 0+16, view_size.x-16)
	# position = pos
	pass

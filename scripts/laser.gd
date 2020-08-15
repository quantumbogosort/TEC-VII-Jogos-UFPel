extends Area2D

export var velocity = Vector2()
# const scn_flare = preload("res://stages/flare.tscn")

func _ready():
	set_process(true)
	connect("area_entered", self, "_on_area_enter")
	# create_flare()
	
	#yield(get_node("vis_notifier"), "screen_exited")
	pass
	
func _process(delta):
	translate(velocity * delta)
	yield(get_tree().create_timer(0.5), "timeout")
	pass
	
# func create_flare():
#	var flare = scn_flare.instance()
#	flare.position = position
	#get_tree().get_root().add_child(flare)
	# get_node("container").add_child(flare)
	#pass
	
func _on_area_enter(other):
	if other.is_in_group("enemy"):
		other.armor -= 1
		queue_free()
	pass

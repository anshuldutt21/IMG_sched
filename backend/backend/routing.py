from channels.routing import ProtocolTypeRouter
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import schedule.routing


application = ProtocolTypeRouter({
'websocket': AuthMiddlewareStack(
	URLRouter(
			schedule.routing.websocket_urlpatterns
		)
	),

})
from channels.routing import ProtocolTypeRouter
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import schedule.routing
from schedule.auth_token import TokenAuthMiddlewareStack


application = ProtocolTypeRouter({
'websocket': TokenAuthMiddlewareStack(
	URLRouter(
			schedule.routing.websocket_urlpatterns
		)
	),

})
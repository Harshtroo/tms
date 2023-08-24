import logging



from .base import *  # noqa
from .base import env


SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
# https://docs.djangoproject.com/en/dev/ref/settings/#secure-ssl-redirect


SESSION_COOKIE_SECURE = True
# https://docs.djangoproject.com/en/dev/ref/settings/#csrf-cookie-secure
CSRF_COOKIE_SECURE = True


# https://docs.djangoproject.com/en/dev/ref/settings/#secure-hsts-include-subdomains
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool(
    "DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True
)

# https://docs.djangoproject.com/en/dev/ref/settings/#secure-hsts-preload
SECURE_HSTS_PRELOAD = env.bool("DJANGO_SECURE_HSTS_PRELOAD", default=True)
# https://docs.djangoproject.com/en/dev/ref/middleware/#x-content-type-options-nosniff
SECURE_CONTENT_TYPE_NOSNIFF = env.bool(
    "DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", default=True
)



ENABLE_APM = env.bool("ENABLE_APM", default=True)
if ENABLE_APM:
    ELASTIC_APM_IP = env.str("ELASTIC_APM_IP", default="")
    INSTALLED_APPS.append("elasticapm.contrib.django")
    MIDDLEWARE.insert(0, "elasticapm.contrib.django.middleware.TracingMiddleware")
    ELASTIC_APM = {
        "SERVICE_NAME": PROJECT_NAME,
        "SERVER_URL": ELASTIC_APM_IP,
        "DJANGO_TRANSACTION_NAME_FROM_ROUTE": True,
    }




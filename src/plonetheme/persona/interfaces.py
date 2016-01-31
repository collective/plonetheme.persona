# -*- coding: utf-8 -*-
"""Module where all interfaces, events and exceptions live."""

from zope.interface import Interface
from zope import schema
from zope.publisher.interfaces.browser import IDefaultBrowserLayer

from . import _


class IPlonethemePersonaLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""


class IPlonethemePersonaSettings(Interface):

    site_description = schema.TextLine(
        title=_(u'Site description'),
        description=_(u'Site description to show as headline'),
        required=False,
        default=u'')

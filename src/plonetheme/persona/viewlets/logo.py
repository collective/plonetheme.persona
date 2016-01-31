# -*- coding: utf-8 -*-
from plone import api
from plone.app.layout.viewlets.common import LogoViewlet
from Products.CMFPlone.utils import getSiteLogo


class LogoViewlet(LogoViewlet):
    def update(self):
        super(LogoViewlet, self).update()

        site_title = api.portal.get_registry_record('plone.site_title')
        self.logo_title = site_title

        self.logo_src = getSiteLogo()
        self.site_description = api.portal.get_registry_record(
            'plonetheme.persona.site_description'
        )
        self.site_title = site_title

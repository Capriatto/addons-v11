# -*- coding: utf-8 -*-
{
    'license': "OPL-1",
    'name': "Document Viewer PDF",
    'summary': "View PDF format documents",
    'author': "renjie <i@renjie.me>",
    'website': "https://renjie.me",
    'support': 'i@renjie.me',
    'category': 'Document Management',
    'version': '1.0',
    'price': 19.98,
    'currency': 'EUR',
    'depends': ['document', 'web'],
    'data': [
        'views/webclient_templates.xml',
    ],
    'qweb': [
        "static/src/xml/base.xml",
    ],
    'images': [
        'static/description/main_screenshot.png',
    ],
    'installable': True,
    'auto_install': False,
    'application': True,
}
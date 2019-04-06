odoo.define('document_viewer_pdf', function (require) {
"use strict";

var core = require('web.core');
var Sidebar = require('web.Sidebar');
var Widget = require('web.Widget');

var _t = core._t;

Sidebar.include({
    start : function(){
        var self = this;
        self._super.apply(self, arguments);
        self.$el.on('click','.o_sidebar_viewer_item', function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            var $target = $(evt.currentTarget);
            var id = parseInt($target.attr('data-id'), 10);
            self.do_action({
                name: _t('Attachment Viewer'),
                type: 'ir.actions.client',
                tag: "document.viewer.pdf",
                params: {
                    id: id
                },
                target: 'new'
            });
        });
    }
});

var ViewerPdf = Widget.extend({
    template: "ViewerPdf",
    init: function(parent, action, options) {
        var self = this;
        var url = "/web/static/lib/pdfjs/web/viewer.html";
        url += "?file=/web/content/" + action.params.id;
        url += "#page=1&zoom=page-width";
        self.url = url;
        self._super.apply(self, arguments);
    },
    start: function() {
        var self = this;
        self.$iframe = self.$el.find("iframe");
        self.waitForPDF();
        return self._super();
    },
    waitForPDF: function() {
        var self = this;
        var $contents = $();
        try{
            $contents = self.$iframe.contents();
        }catch(e){}
        if($contents.find('#errorMessage').is(":visible")) {
            return;
        }
        if($contents.find('.page').length > 0 && $contents.find('.textLayer').length > 0) {
            self.doPDFPostLoad();
        } else {
            setTimeout(function() { self.waitForPDF(); }, 50);
        }
    },
    renderElement: function() {
        var self = this;
        self._super();
        self.getParent().$footer.hide();
    },
    doPDFPostLoad: function() {
        var self = this;
        var $contents = self.$iframe.contents();
        $contents.find('#openFile, #viewBookmark, #documentProperties').hide();
        $contents.find('#documentProperties').prev().hide();
        core.bus.on('resize', null, self.proxy(self.resizeIframe));
        self.resizeIframe();
    },
    resizeIframe: function() {
        var self = this;
        var $body = self.$el.parent();
        try{
            self.$iframe.contents();
        }catch(e){
            return;
        }
        var $viewer = self.$iframe.contents().find('.pdfViewer');
        self.$iframe.height($viewer.height() + $viewer.parent().offset().top);
        self.$iframe.height($body.height());
    },
    destroy: function () {
        var self = this;
        core.bus.off('resize', null, self.proxy(self.resizeIframe));
        self._super();
    }
});

core.action_registry.add('document.viewer.pdf', ViewerPdf);

});
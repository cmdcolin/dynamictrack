define([
           'dojo/_base/declare',
           'JBrowse/Plugin'
       ],
       function(
           declare,
           JBrowsePlugin
       ) {
return declare( JBrowsePlugin,
{
    constructor: function( args ) {
        var browser = args.browser;

        // do anything you need to initialize your plugin here
        console.log( "DynamicTrack plugin starting" );
        var trackConfig = {
            "label" : "fromfaye",
            "features" : [{
                "seq_id" : "ctga",
                "name" : "Notified",
                "polarity" : "hijinxed",
                "description" : "Test feature added via Faye",
                "end" : 440,
                "start" : 330
            }],
            "storeClass" : "JBrowse/Store/SeqFeature/FromConfig",
            "type" : "JBrowse/View/Track/CanvasFeatures"
        };
        var store = dojo.clone(trackConfig);
        var track = dojo.clone(trackConfig);
        store.browser = browser;
        store.type = store.storeClass;
        track.store = browser.addStoreConfig(undefined, store);
        browser.publish ('/jbrowse/v1/v/tracks/new', [track]);
    }
});
});

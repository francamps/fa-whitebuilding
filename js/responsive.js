
//
// sync js with media queries
// to resize top bar
//
var $headerMainNav = $('#header .mainNav-menu'),

    wasNarrow = false;



function isNarrow() {

    return $headerMainNav.css( "display" ) == "none";

}

//
// sync media queries with js
//
$( window ).on( 'resize', function( e ) {

    if ( isNarrow() && !wasNarrow ) {
        showStackedTopBar();
        wasNarrow = true;
    }
    else if ( !isNarrow() && wasNarrow  ) {
        showDefaultTopBar();
        wasNarrow = false;
    }

} ).trigger( 'resize' );


function showStackedTopBar() {

    // add stacked icon
    $( '#header' ).append(
        '<div class="btn-stacked-menu"></div>'
    );

    $( '.btn-stacked-menu' ).on( 'click', function() {
        var $btn = $(this),
            isActive = $btn.hasClass( 'active' );

        if ( isActive ) {
            $btn.removeClass( 'active' );
            hideStakedMenu();
        } else {
            $btn.addClass( 'active' );
            showStakedMenu();
        }
    } );

}


function showDefaultTopBar() {

    // remove stacked icon
    // this removes callbacks
    $( '#header .btn-stacked-menu' ).remove();

}


function showStakedMenu() {



    if ( getCurrentFile() == "" ) {
        $( '#header' ).append( getHomeStackedMenu() );
        getHomeStackedMenu
    } else {
        var lang = getCurrentLanguage();
        $( '#header' ).append( get_menuStaked_html( lang ) );
    }

    highlightCurrentItem();

}


function hideStakedMenu() {

    $( '#header .staked-nav' ).remove();

}


function highlightCurrentItem() {

    var section = getCurrentFile();

    console.log(section);

    $('.staked-nav [href*="' + section + '"]')
        .addClass( 'active' )
        .removeAttr('href')
        .css('cursor', 'default');

}


function getCurrentLanguage() {

    var segments = location.pathname.split( '/' );
    return segments[ segments.length - 2 ];

}


function getCurrentFile() {

    var segments = location.pathname.split( '/' );
    return segments[ segments.length - 1 ];

}


function get_menuStaked_html( lang ) {

    return [
        '<div class="staked-nav">',
            '<a class="item" href="../">',
                '<span>Explore</span><span>استكشف</span>',
            '</a>',
            '<a class="item" href="../' + lang + '/about.php">',
                '<span>About</span><span>حول</span>',
            '</a>',
            '<a class="item" href="../' + lang + '/saydnaya.php">',
                '<span>Saydnaya</span><span>صيدنايا</span>',
            '</a>',
            '<a class="item" href="../' + lang + '/detention-in-syria.php">',
                '<span>Detention in Syria</span><span>الاعتقال في سوريا</span>',
            '</a>',
            '<a class="item" href="../' + lang + '/methodology.php">',
                '<span>Methodology</span><span>صيدنايا</span>',
            '</a>',
        '</div>'
    ].join('');

}


function getHomeStackedMenu() {
    return [
        '<div class="staked-nav">',
            '<a class="item" href="./">',
                '<span>Explore</span><span>استكشف</span>',
            '</a>',
            '<a class="item" href="en/about.php">',
                '<span>About</span><span>حول</span>',
            '</a>',
            '<a class="item" href="en/saydnaya.php">',
                '<span>Saydnaya</span><span>صيدنايا</span>',
            '</a>',
            '<a class="item" href="en/detention-in-syria.php">',
                '<span>Detention in Syria</span><span>الاعتقال في سوريا</span>',
            '</a>',
            '<a class="item" href="en/methodology.php">',
                '<span>Methodology</span><span>صيدنايا</span>',
            '</a>',
        '</div>'
    ].join('');
}

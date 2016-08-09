invApp.controller( "mainCtrl", function( $scope, DBService, $timeout, $cookies, $location ){
    
    
    if( $cookies.get('isLoggedIn') != 'true' )
        $location.path('/');
<<<<<<< HEAD
	
	$scope.deAuth = function(){
            $cookies.remove('isLoggedIn');
            $location.path('/');
    }
=======
>>>>>>> dcdb98e814e9f571a1c699771cb55badccc3d13a
    
    $scope.printDiv = function( divId, divTitle ){
        console.log(divId);
        $( '#'+ divId ).print({title:divTitle}); 
    };
    
    /***********************************************
        Global Floating Message for all CRUD operations
    ***********************************************/
    
    // shows during asynchronous processes
    $scope.floatingMsg = {
        text : "Loading...",
        isVisible : false,
        error : false
    };
    
    /***********************************************
        CREATE
    ***********************************************/
    
    /* for new item
    ***********************************************/
    
    // new item model
    var item = function( name ){
        this.name = name;
    };
    
    $scope.addItem = function( name )
    {  
        // declare and initialise a new item using constructor
        var obj = new item( name );
        
        console.log("new item to be created and pushed");
        console.log(obj);

        // push item into item DB
        DBService.push('/items/', obj, function(pushId){
            //set same item in transaction DB
            DBService.set('/transactions/' + pushId, obj, function(){});
        });
    };
    
    $scope.addYear = function( itemKey, year, openingBal )
    {   
        var newYear = {};
        newYear.openingBal = openingBal;
        newYear.purchased = 0;
        newYear.disposal = 0;
        newYear.balance = openingBal;
        
        // set initialised year for item
        DBService.set('/items/'+itemKey+'/years/'+year+'/', newYear, function(){});
    };
    
    $scope.addInvoice = function( invoice, year, itemKey )
    {
        invoice.type = "invoice";
        invoice.dateString = invoice.date.toDateString();
        
        // push invoice to corresponding year in transaction
        DBService.push('/transactions/'+itemKey+'/years/'+year+'/', invoice, function(){});
        
        // update item quantity
        var obj = {};
        obj.purchased = $scope.itemList[itemKey].years[year].purchased + invoice.quantity;
        obj.balance = $scope.itemList[itemKey].years[year].balance + invoice.quantity;
        DBService.update('/items/'+itemKey+'/years/'+year, obj, function(){});
        
        // add to day book
        invoice.itemName = $scope.itemList[itemKey].name;
        DBService.push('/yearlyPurchases/'+year+'/', invoice, function(){});
    };
    
    $scope.addDisposal = function( disposal, year, itemKey )
    {
        disposal.type = "disposal";
        disposal.dateString = disposal.date.toDateString();
        
        // push invoice to corresponding year in transaction
        DBService.push('/transactions/'+itemKey+'/years/'+year+'/', disposal, function(){});
        
        // update item quantity
        var obj = {};
        obj.disposal = $scope.itemList[itemKey].years[year].disposal + disposal.quantity;
        obj.balance = $scope.itemList[itemKey].years[year].balance - disposal.quantity;
        DBService.update('/items/'+itemKey+'/years/'+year, obj, function(){});
    };
    
    
    /***********************************************
        READ - pull from DB and attach to scope
    ***********************************************/
    
    DBService.fetch( '/items', $scope.floatingMsg, function( result ){
        
        $timeout( function(){
            $scope.itemList = result;
            // after load, hide floating message
            $scope.floatingMsg.isVisible = false;
        });
    
    });
    
    DBService.fetch( '/transactions', $scope.floatingMsg, function( result ){
        
        $timeout( function(){
            $scope.transactions = result;
            // after load, hide floating message
            $scope.floatingMsg.isVisible = false;
        });
    
    });
    
});

invApp.controller( "ledgerCtrl", function( $scope, DBService, $timeout, $routeParams, $cookies, $location ){
    
    if( $cookies.get('isLoggedIn') != 'true' )
        $location.path('/');
    
    $scope.printDiv = function( divId, divTitle ){
        console.log(divId);
        $( '#'+ divId ).print({title:divTitle}); 
    };
    
    // shows during asynchronous processes
    $scope.floatingMsg = {
        text : "Loading...",
        isVisible : false,
        error : false
    };
    
    /***********************************************
        READ - pull from DB and attach to scope
    ***********************************************/
    
    // service to pull json object from DB
    DBService.fetch( '/yearlyPurchases', $scope.floatingMsg, function( result ){
        
        $timeout( function(){
            $scope.yearList = result;
            $scope.param = $routeParams.param;
            console.log( $scope.param );
            
            // after load, hide floating message
            $scope.floatingMsg.isVisible = false;
        });
    
    });
    
});

invApp.controller( "loginCtrl", function( $scope, $cookies, $location ){
    
    if( $cookies.get('isLoggedIn') == 'true' )
        $location.path('/stock/');
    
    $scope.auth = function( pass ){
        if( pass == "nice" ){
            $cookies.put('isLoggedIn', 'true');
            $location.path('/stock/');
        }
    }
    
});

var yplayer = angular.module('YPlayer', []);


yplayer.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});

yplayer.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

var controllers = {};

controllers.playController = function($scope, $http){
    $scope.sayHi = function(){
        alert('Hi');
    };
};

controllers.searchController = function($scope, $http) {
    $scope.input = "java";
    $scope.safeSearch = 'strict';
    var lastInput = $scope.input;

    $scope.filterSearch = function(filterValue) {
        $scope.safeSearch = filterValue;
        $scope.search();
    };

    $scope.search = function() {
        $http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: 'AIzaSyCKC6FyaBSLrKUddx6iMjsIJEzaLme63Mc',
                type: 'video',
                maxResults: '1',
                pageToken: '',//isNewQuery ? '' : $scope.nextPageToken,
                part: 'id,snippet',
                fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken',
                q: $scope.input,
                safeSearch: $scope.safeSearch
            }
        }).success( function (data) {
            if (data.items.length === 0) {
                $scope.label = 'No results were found!';
            }
            //console.log("title : " + data.items[0].snippet.title);
            //console.log("url : https://www.youtube.com/watch?v=" + data.items[0].id.videoId);
            //console.log(data);
            $scope.title = data.items[0].snippet.title;
            $scope.video_url = "https://www.youtube.com/embed/" + data.items[0].id.videoId + "?autoplay=1";
            //alert(document.getElementById('video_frame').src);
            document.getElementById('video_frame').src = $scope.video_url;

        }).error( function () {
            console.log('Search error');
        }).finally( function () {
            console.log('Done')
        });
        }
    };


yplayer.controller(controllers);
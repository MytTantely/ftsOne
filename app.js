const Couchbase = require('couchbase');

const cluster = new Couchbase.Cluster('couchbase://localhost');
cluster.authenticate('beerSampleUser','1234567890');
const bucket = cluster.openBucket('beer-sample');

const SearchQuery = Couchbase.SearchQuery;
const SearchFacet = Couchbase.SearchFacet;

var tq1 = SearchQuery.term('coffee').field('description');

// var query1 = SearchQuery.new('beer-search', tq1);
// query1.addFacet('categories', SearchFacet.term('category', 5));
// query1.limit(3);
// bucket.query(query1, (error, result, meta) => {
//     for(var i = 0; i < result.length; i++){
//         console.log('HIT: ', result[i].id);
//         console.log('FACETS: ', meta.facets['categories'].terms);
//     }
// });

var tq2 = SearchQuery.term('German Lager').field('category');
var conjunction = SearchQuery.conjuncts(tq1, tq2);

var query2 = SearchQuery.new('beer-search', conjunction);
query2.addFacet('categories', SearchFacet.term('category', 5));
query2.limit(3);

bucket.query(query2, (error, result, meta) => {
    for(var i = 0; i < result.length; i++){
        console.log('HIT: ', result[i].id);
        console.log('FACETS: ', meta.facets['categories'].terms);
    }
});
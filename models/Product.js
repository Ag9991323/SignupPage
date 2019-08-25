var mongoose= require('mongoose');

var productSchema= new mongoose.Schema({
    uniq_id:{type:String},
    crawl_timestamp:{type : Date},
    product_url :{type:String,unique:true},
    product_category_tree:{type:String},
    pid:{type :String},
    retail_price:{type :Number},
    discounted_price:{type :Number},
    image:{type :Array},
    is_FK_Advantage_product :{type: Boolean},
    description :{type:String},
    product_rating :{type:String},
    overall_rating :{type:String},
    brand:{type:String},
    product_specifications :{type:String}
});



var Product =mongoose.model('myproduct',productSchema);
module.exports =Product;

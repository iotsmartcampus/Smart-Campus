const innerLogValueSchema = mongoose.Schema(
    {
      seconds: { type: Number, required: true },
    },
    { timestamps: true }
  );


const logTemperatureSchema = mongoose.Schema(
    {
      temeperatureLogSecs: {
        type: Array,
        default: [innerLogValueSchema],
      },
    },
    {
      timestamps: true,
    }
  );
  
  const TemperatureLog = mongoose.model('Product', productSchema);
  
  export default Product;
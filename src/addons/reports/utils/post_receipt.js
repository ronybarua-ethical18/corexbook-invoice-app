const PDFDocument = require('pdfkit');
const fs = require('fs');
const getStream =require('get-stream');


const PDFReceiptStream=async(marchant,order)=>{
    const doc = new PDFDocument({
        size:[164,595],
        margins:{
            top:5,
            bottom:0,
            left:10,
            right:10
        }
    });

    
    doc
    .font("Helvetica-Bold")
    .text("Munni's Kitchen",{
        align:"center"
    })
    .moveDown(.3)
    .font("Helvetica")
    .fontSize(8)
    .text("House No: 5, Road No: 30, Pallabi, Mirpur- 12, Mirpur, Dhaka 1216",{
        align:"center"
    })
    .moveDown(.5)
    .text("Phone : +8801307524982, reach@munniskitech.com",{
        align:"center"
    })
    .text("________________________________")
    .moveDown(.5)
    .font("Helvetica-Bold")
    .text("ORDER: #012",{
        align:"center"
    })
    .text("________________________________")
    
    .moveDown(.5)
    let menuStartingX=doc.x
    let menuStartingY = doc.y
    doc.text("Item")
    doc.text("Price",menuStartingX+60,menuStartingY)
    doc.text("Qty",menuStartingX+90,menuStartingY)
    doc.text("Total",menuStartingX+110,menuStartingY)
    
    
    menuStartingX=10
    menuStartingY+=20
        
    order.items.forEach(item=>{
        doc.font("Helvetica")
        .text(item.title,menuStartingX,menuStartingY,{
            width:55,
            lineBreak:false,
            ellipsis:true
        })
        .text(`Tk.${item.price}`,menuStartingX+60,menuStartingY,{
            width:55
        })
        .text(item.quantity,menuStartingX+95,menuStartingY,)
        .text(`Tk.${item.item_total}`,menuStartingX+110,menuStartingY)

        menuStartingY+=25

    })
    
    doc.font("Helvetica-Bold")
    .text(`Discount : Tk.${order.discount}`,menuStartingX,menuStartingY,{align:"right"})
    .text(`Tax : Tk.${order.tax}`,{align:"right"})
    .text(`Total : Tk.${order.total}`,{align:"right"})
    .moveDown(1)
    
    doc.text("Thank you! ",
    {
        align:"center"
    })
    .moveDown(1)
    doc.font("Helvetica")
    .fontSize(7)
    .text("Developed By Corexlab Limited (01307524982)",{
        align:"center"
    })
    doc.end();

    const pdfStream = await getStream.buffer(doc);

    return pdfStream;

    
}

module.exports={PDFReceiptStream}

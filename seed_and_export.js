const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load .env.local manually since dotenv might not be installed
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let val = parts.slice(1).join('=').trim();
            // Remove quotes if present
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            process.env[key] = val;
        }
    });
}

const productsData = [
    {
        name: 'شال نخی کرم',
        category: 'شال',
        price: 650,
        description: 'شال نخی بسیار سبک و خنک با رنگ کرم ملایم، مناسب برای استفاده روزمره و ست کردن با انواع لباس‌ها.',
        images: ['/images/beige-shawl.png'],
        stock: 20,
        isFeatured: true
    },
    {
        name: 'عبای کلاسیک مشکی',
        category: 'عبایا',
        price: 3500,
        description: 'عبای مشکی ساده و شیک با دوخت عالی و پارچه باکیفیت که ریزش بسیار زیبایی دارد.',
        images: ['/images/abaya.png'],
        stock: 15,
        isFeatured: true
    },
    {
        name: 'شال پشمی چهارخانه',
        category: 'شال زمستانی',
        price: 950,
        description: 'شال پشمی گرم با طرح چهارخانه کلاسیک، انتخابی عالی برای روزهای سرد زمستان.',
        images: ['/images/checkered-wool.png'],
        stock: 10,
        isFeatured: true
    },
    {
        name: 'روسری گلدار بهاری',
        category: 'روسری',
        price: 850,
        description: 'روسری با طرح گل‌های بهاری و رنگ‌های شاد، جنس نخی و بسیار لطیف.',
        images: ['/images/floral-scarf.png'],
        stock: 25,
        isFeatured: true
    },
    {
        name: 'عبای مجلسی نگین‌دار',
        category: 'عبایا',
        price: 5800,
        description: 'عبای مجلسی لوکس با تزیینات ظریف و نگین‌دوزی، مناسب برای مجالس و مهمانی‌های خاص.',
        images: ['/images/luxury-abaya.png'],
        stock: 5,
        isFeatured: true
    },
    {
        name: 'شال حریر طلایی',
        category: 'شال مجلسی',
        price: 1200,
        description: 'شال حریر با درخشش ملایم طلایی، بسیار سبک و مناسب برای استایل‌های رسمی.',
        images: ['/images/golden-chiffon.png'],
        stock: 12,
        isFeatured: true
    },
    {
        name: 'شال کشمیر خاکستری',
        category: 'شال زمستانی',
        price: 1100,
        description: 'شال کشمیر لطیف و گرم به رنگ خاکستری که به راحتی با هر رنگی ست می‌شود.',
        images: ['/images/gray-cashmere.png'],
        stock: 18,
        isFeatured: true
    },
    {
        name: 'مقنعه ورزشی مشکی',
        category: 'ورزشی',
        price: 450,
        description: 'مقنعه ورزشی با پارچه تنفس‌پذیر و طراحی راحت برای فعالیت‌های ورزشی.',
        images: ['/images/black-sports.png'],
        stock: 30,
        isFeatured: true
    },
    {
        name: 'مگنت‌های طلایی روسری',
        category: 'ملزومات حجاب',
        price: 250,
        description: 'مگنت‌های قوی و زیبا برای نگه داشتن روسری بدون آسیب زدن به پارچه.',
        images: ['/images/gold-magnets.png'],
        stock: 50,
        isFeatured: false
    },
    {
        name: 'ست اکسسوری حجاب',
        category: 'ملزومات حجاب',
        price: 600,
        description: 'مجموعه‌ای کاربردی از اکسسوری‌های حجاب شامل گیره، سوزن و هد.',
        images: ['/images/accessories.png'],
        stock: 40,
        isFeatured: false
    },
    {
        name: 'شال ساده نخی',
        category: 'شال',
        price: 550,
        description: 'شال ساده نخی، سبک و راحت در رنگ‌بندی متنوع برای استفاده روزانه.',
        images: ['/images/shawl.png'],
        stock: 35,
        isFeatured: false
    },
    {
        name: 'رژ لب مات مخملی',
        category: 'آرایشی',
        price: 450,
        description: 'رژ لب با بافت مخملی و ماندگاری بالا، بدون ایجاد خشکی روی لب.',
        images: ['/images/lipstick.png'],
        stock: 60,
        isFeatured: true
    },
    {
        name: 'کرم آبرسان صورت',
        category: 'بهداشتی',
        price: 850,
        description: 'کرم آبرسان قوی مناسب برای انواع پوست، حاوی ویتامین E.',
        images: ['/images/cream.png'],
        stock: 45,
        isFeatured: false
    },
    {
        name: 'کیف دوشی چرم',
        category: 'کیف',
        price: 2800,
        description: 'کیف دوشی زنانه از چرم مصنوعی با کیفیت عالی و طراحی مینیمال.',
        images: ['/images/leather-bag.png'],
        stock: 12,
        isFeatured: true
    },
    {
        name: 'کفش راحتی طبی',
        category: 'کیف',
        price: 3200,
        description: 'کفش راحتی با کفی طبی، مناسب برای پیاده‌روی‌های طولانی.',
        images: ['/images/shoes.png'],
        stock: 20,
        isFeatured: false
    },
    {
        name: 'عینک آفتابی فریم بزرگ',
        category: 'عینک',
        price: 1500,
        description: 'عینک آفتابی با فریم بزرگ و مدرن، محافظت کامل در برابر اشعه UV.',
        images: ['/images/sunglasses.png'],
        stock: 25,
        isFeatured: true
    },
    {
        name: 'گردنبند طلا ظریف',
        category: 'زیورآلات',
        price: 4500,
        description: 'گردنبند ظریف با آبکاری طلا، طراحی مینیمال و شیک.',
        images: ['/images/necklace.png'],
        stock: 10,
        isFeatured: true
    },
    {
        name: 'کمربند چرم باریک',
        category: 'کمربند',
        price: 850,
        description: 'کمربند باریک چرم، مناسب برای روی لباس و مانتو.',
        images: ['/images/belt.png'],
        stock: 40,
        isFeatured: false
    },
    {
        name: 'عبای مخمل سبز زمردی',
        category: 'عبایا',
        price: 7800,
        description: 'این عبای مخمل مشکی با گلدوزی‌های کریستالی سبز زمردی و نقره‌ای، ترکیبی بی‌نظیر از اصالت و شکوه را به نمایش می‌گذارد. طرح یقه باز و کار شده‌ی آن، جلوه‌ای سلطنتی به استایل شما می‌بخشد که برای مجالس خاص ایده‌آل است. پارچه مخمل درجه یک با ریزش فوق‌العاده، راحتی و زیبایی را همزمان تضمین می‌کند. یک انتخاب لوکس برای بانوان شیک‌پوش.',
        images: ['/images/velvet-green-crystal-abaya.jpg'],
        stock: 5,
        isFeatured: true
    },
    {
        name: 'پیراهن کریستالی موج',
        category: 'عبایا',
        price: 6900,
        description: 'طراحی منحصر به فرد با خطوط موج‌دار کریستالی نقره‌ای روی زمینه مشکی، این پیراهن را به اثری هنری تبدیل کرده است. یقه ایستاده و آستین‌های کلوش با تزیینات ظریف، وقار و متانت را در کنار درخشش خیره‌کننده به ارمغان می‌‌آورد. مناسب برای مهمانی‌های شبانه که می‌خواهید مرکز توجه باشید. دوختی بسیار تمیز و با کیفیت.',
        images: ['/images/black-wave-crystal-dress.jpg'],
        stock: 8,
        isFeatured: true
    },
    {
        name: 'پیراهن مخمل زرشکی فاخر',
        category: 'عبایا',
        price: 8500,
        description: 'پیراهن مخمل زرشکی با تزیینات سنگ‌دوزی طلایی و نقره‌ای در قسمت یقه و سینه، نمادی از تجمل و زیبایی کلاسیک است. رنگ گرم زرشکی در کنار درخشش کریستال‌ها، هارمونی جذابی ایجاد کرده که چشم‌ها را خیره می‌کند. آستین‌های کار شده و برش دقیق لباس، اندام را کشیده‌تر و زیباتر نشان می‌دهد. انتخابی عالی برای مراسم‌های رسمی.',
        images: ['/images/burgundy-velvet-dress-full.jpg', '/images/burgundy-velvet-dress-detail.jpg'],
        stock: 4,
        isFeatured: true
    }
];

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    images: [String],
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sheen_hijab';

async function seedAndExport() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        console.log('Using URI:', MONGODB_URI.split('@')[1] || MONGODB_URI); // Log part of URI to confirm

        console.log('Seeding database...');
        await Product.deleteMany({});
        await Product.create(productsData);
        console.log(`Database seeded with ${productsData.length} products.`);

        const products = await Product.find({}).lean();

        const outputPath = path.join(__dirname, 'all_products.json');
        fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
        console.log(`Successfully exported ${products.length} products to ${outputPath}`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedAndExport();

/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   const { discount, sale_price, quantity } = purchase;
   const discountFactor = 1 - discount / 100;

   return sale_price * quantity * discountFactor;
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    const { profit } = seller;

    if (index === 0) return profit * 0.15;
    if (index === 1 || index === 2) return profit * 0.10;
    if (index === total - 1) return 0;
    return profit * 0.05;
}

/**
 * Валидация входных данных
 * @param data
 */
function validateData(data) {
    if (!data) {
        throw new Error("Данные не переданы");
    }

    const collections = ["sellers", "products", "purchase_records"];
    for (const collection of collections) {
        if (!Array.isArray(data[collection])) {
            throw new Error(`Коллекция '${collection}' должна быть массивом`);
        }
        if (data[collection].length === 0) {
            throw new Error(`Коллекция '${collection}' не может быть пустой`);
        }
    }
}

/**
 * Валидация опций
 * @param options
 */
function validateOptions(options) {
    if (
        !options
        || typeof options !== "object"
        || Array.isArray(options)
    ) {
        throw new Error("Опции должны быть объектом");
    }

    const params = ["calculateRevenue", "calculateBonus"];
    for (const param of params) {
        if (typeof options[param] !== "function") {
            throw new Error(`Параметр '${param}' должен быть функцией`);
        }
    }
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    validateData(data);
    validateOptions(options); 

    const { calculateRevenue, calculateBonus } = options;

    // Подготовка промежуточных данных для сбора статистики
    const sellerStats = data.sellers.map(seller => ({
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,
        profit: 0,
        sales_count: 0,
        products_sold: {}
    }));

    // Индексация продавцов и товаров для быстрого доступа
    const sellerIndex = Object.fromEntries(sellerStats.map(seller => [seller.id, seller]));
    const productIndex = Object.fromEntries(data.products.map(product => [products.sku, product]));

    // @TODO: Расчет выручки и прибыли для каждого продавца

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Sun, Clock, DollarSign } from "lucide-react";
interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  image: string;
  waterNeeds: string;
  sunlightNeeds: string;
  growthTime: string;
  cost: string;
  companionPlants: string[];
}

// Sample plant data
const plantsData: Plant[] = [
  {
    id: "1",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    description: "A popular garden vegetable that produces juicy red fruits.",
    category: "Vegetable",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "full",
    growthTime: "70-85 days",
    cost: "low",
    companionPlants: ["Basil", "Marigold", "Onion"]
  },
  {
    id: "2",
    name: "Basil",
    scientificName: "Ocimum basilicum",
    description: "An aromatic herb used in cooking, especially in Italian dishes.",
    category: "Herb",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "partial",
    growthTime: "40-60 days",
    cost: "very low",
    companionPlants: ["Tomato", "Pepper", "Oregano"]
  },
  {
    id: "3",
    name: "Carrot",
    scientificName: "Daucus carota",
    description: "A root vegetable, usually orange in color, though other colors exist.",
    category: "Root",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "partial",
    growthTime: "60-80 days",
    cost: "very low",
    companionPlants: ["Tomato", "Onion", "Chives"]
  },
  {
    id: "4",
    name: "Sunflower",
    scientificName: "Helianthus annuus",
    description: "Tall plants known for their large, bright yellow flowers and edible seeds.",
    category: "Flower",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "low",
    sunlightNeeds: "full",
    growthTime: "80-120 days",
    cost: "low",
    companionPlants: ["Cucumber", "Corn", "Zucchini"]
  },
  {
    id: "5",
    name: "Blueberry",
    scientificName: "Vaccinium corymbosum",
    description: "A perennial flowering plant that produces berries of a blue color.",
    category: "Fruit",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "partial",
    growthTime: "2-3 years for full production",
    cost: "high",
    companionPlants: ["Strawberry", "Thyme", "Clover"]
  },
  {
    id: "6",
    name: "Rosemary",
    scientificName: "Salvia rosmarinus",
    description: "An evergreen herb with fragrant, needle-like leaves used in cooking.",
    category: "Herb",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "low",
    sunlightNeeds: "full",
    growthTime: "12-24 months to mature",
    cost: "low",
    companionPlants: ["Sage", "Thyme", "Lavender"]
  },
  {
    id: "7",
    name: "Bell Pepper",
    scientificName: "Capsicum annuum",
    description: "Sweet peppers that come in various colors like green, red, yellow, and orange.",
    category: "Vegetable",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    waterNeeds: "medium",
    sunlightNeeds: "full",
    growthTime: "60-90 days",
    cost: "medium",
    companionPlants: ["Tomato", "Basil", "Parsley"]
  },
  {
    id: "8",
    name: "Lavender",
    scientificName: "Lavandula",
    description: "An aromatic perennial plant known for its beautiful purple flowers and calming scent.",
    category: "Flower",
    difficulty: "Medium",
    image: "/images/others/lavender.jpeg",
    waterNeeds: "low",
    sunlightNeeds: "full",
    growthTime: "1-3 years to mature",
    cost: "medium",
    companionPlants: ["Rosemary", "Thyme", "Oregano"]
  },
  {
  id: "9",
  name: "Aloe Vera",
  scientificName: "Aloe barbadensis miller",
  description: "A medicinal succulent known for its healing gel.",
  category: "Medicinal",
  difficulty: "Easy",
  image: "https://images.unsplash.com/photo-1587502537745-84e6b3c9e56d" ,
  waterNeeds: "low",
  sunlightNeeds: "partial",
  growthTime: "6-12 months",
  cost: "low",
  companionPlants: ["Cactus", "Agave", "Snake Plant"]
},
{
  id: "10",
  name: "Snake Plant",
  scientificName: "Sansevieria trifasciata",
  description: "An indoor plant known for air purification and low maintenance.",
  category: "Indoor",
  difficulty: "Easy",
  image: "/images/others/snake-plant.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "shade",
  growthTime: "Slow growth",
  cost: "low",
  companionPlants: ["Aloe Vera", "ZZ Plant", "Money Plant"]
},
{
  id: "11",
  name: "Money Plant",
  scientificName: "Epipremnum aureum",
  description: "A popular indoor plant believed to bring prosperity.",
  category: "Indoor",
  difficulty: "Easy",
  image: "/images/others/money-plant.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "partial",
  growthTime: "Fast growing",
  cost: "low",
  companionPlants: ["Snake Plant", "Peace Lily", "Spider Plant"]
},
{
  id: "12",
  name: "Neem Tree",
  scientificName: "Azadirachta indica",
  description: "A medicinal tree known for antibacterial properties.",
  category: "Tree",
  difficulty: "Medium",
  image: "/images/others/neem.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "full",
  growthTime: "3-5 years",
  cost: "low",
  companionPlants: ["Tulsi", "Moringa", "Aloe Vera"]
},
{
  id: "13",
  name: "Tulsi",
  scientificName: "Ocimum tenuiflorum",
  description: "A sacred medicinal herb widely used in Ayurveda.",
  category: "Medicinal",
  difficulty: "Easy",
  image: "/images/others/tulsi.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "30-60 days",
  cost: "low",
  companionPlants: ["Neem", "Aloe Vera", "Mint"]
},
{
  id: "14",
  name: "Orchid",
  scientificName: "Orchidaceae",
  description: "An elegant flowering plant with exotic blooms.",
  category: "Flower",
  difficulty: "Hard",
  image: "/images/others/orchid.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "partial",
  growthTime: "1-2 years",
  cost: "high",
  companionPlants: ["Fern", "Bamboo", "Peace Lily"]
},
{
  id: "15",
  name: "Hibiscus",
  scientificName: "Hibiscus rosa-sinensis",
  description: "A tropical flowering plant with large, colorful blooms.",
  category: "Flower",
  difficulty: "Easy",
  image: "/images/others/hibiscus.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "3-6 months",
  cost: "low",
  companionPlants: ["Rose", "Jasmine", "Marigold"]
},
{
  id: "16",
  name: "Rose",
  scientificName: "Rosa",
  description: "A popular flowering plant known for its beauty and fragrance.",
  category: "Flower",
  difficulty: "Medium",
  image: "/images/others/rose.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "2-3 months",
  cost: "medium",
  companionPlants: ["Lavender", "Garlic", "Marigold"]
},
{
  id: "17",
  name: "Mango Tree",
  scientificName: "Mangifera indica",
  description: "A tropical fruit tree producing sweet mangoes.",
  category: "Fruit",
  difficulty: "Medium",
  image: "/images/others/mango.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "3-6 years",
  cost: "medium",
  companionPlants: ["Neem", "Banana", "Guava"]
},
{
  id: "18",
  name: "Banana Plant",
  scientificName: "Musa",
  description: "A fast-growing tropical plant producing bananas.",
  category: "Fruit",
  difficulty: "Easy",
  image: "/images/others/banana.jpeg",
  waterNeeds: "high",
  sunlightNeeds: "full",
  growthTime: "9-12 months",
  cost: "medium",
  companionPlants: ["Mango", "Papaya", "Coconut"]
},
{
  id: "19",
  name: "Guava Tree",
  scientificName: "Psidium guajava",
  description: "A fruit tree producing sweet and nutritious guavas.",
  category: "Fruit",
  difficulty: "Easy",
  image: "/images/others/guava.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "2-3 years",
  cost: "medium",
  companionPlants: ["Mango", "Papaya", "Banana"]
},
{
  id: "20",
  name: "Coconut Tree",
  scientificName: "Cocos nucifera",
  description: "A tropical tree known for coconuts and versatile uses.",
  category: "Tree",
  difficulty: "Hard",
  image: "/images/others/coconut.jpeg",
  waterNeeds: "high",
  sunlightNeeds: "full",
  growthTime: "5-10 years",
  cost: "high",
  companionPlants: ["Banana", "Papaya", "Mango"]
},
{
  id: "21",
  name: "Bamboo",
  scientificName: "Bambusoideae",
  description: "A fast-growing plant used for construction and decoration.",
  category: "Tree",
  difficulty: "Easy",
  image: "/images/others/bamboo.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "1-3 years",
  cost: "low",
  companionPlants: ["Fern", "Palm", "Orchid"]
},
{
  id: "22",
  name: "Fern",
  scientificName: "Polypodiopsida",
  description: "A shade-loving plant ideal for indoor decoration.",
  category: "Indoor",
  difficulty: "Medium",
  image: "/images/others/fern.jpeg",
  waterNeeds: "high",
  sunlightNeeds: "shade",
  growthTime: "Slow growth",
  cost: "low",
  companionPlants: ["Orchid", "Bamboo", "Peace Lily"]
},
{
  id: "23",
  name: "Peace Lily",
  scientificName: "Spathiphyllum",
  description: "An indoor plant known for its white flowers and air purification.",
  category: "Indoor",
  difficulty: "Easy",
  image: "/images/others/peace-lily.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "shade",
  growthTime: "Medium growth",
  cost: "low",
  companionPlants: ["Snake Plant", "Fern", "Money Plant"]
},
{
  id: "24",
  name: "Spider Plant",
  scientificName: "Chlorophytum comosum",
  description: "An easy indoor plant that helps purify air.",
  category: "Indoor",
  difficulty: "Easy",
  image: "/images/others/spider-plant.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "partial",
  growthTime: "Fast growth",
  cost: "low",
  companionPlants: ["Money Plant", "Peace Lily", "Snake Plant"]
},
{
  id: "25",
  name: "Papaya",
  scientificName: "Carica papaya",
  description: "A tropical fruit plant known for fast growth and nutrition.",
  category: "Fruit",
  difficulty: "Easy",
  image: "/images/others/papaya.jpeg",
  waterNeeds: "high",
  sunlightNeeds: "full",
  growthTime: "6-12 months",
  cost: "low",
  companionPlants: ["Banana", "Mango", "Guava"]
},
{
  id: "26",
  name: "Jasmine",
  scientificName: "Jasminum",
  description: "A fragrant flowering plant used in perfumes and decoration.",
  category: "Flower",
  difficulty: "Medium",
  image: "/images/others/jasmine.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "6-12 months",
  cost: "medium",
  companionPlants: ["Rose", "Lavender", "Marigold"]
},
{
  id: "27",
  name: "Marigold",
  scientificName: "Tagetes",
  description: "A bright flower used for decoration and pest control.",
  category: "Flower",
  difficulty: "Easy",
  image: "/images/others/marigold.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "45-60 days",
  cost: "low",
  companionPlants: ["Tomato", "Rose", "Pepper"]
},
{
  id: "28",
  name: "Moringa",
  scientificName: "Moringa oleifera",
  description: "A highly nutritious medicinal tree known as the drumstick tree.",
  category: "Medicinal",
  difficulty: "Easy",
  image: "/images/others/moringa.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "full",
  growthTime: "6-12 months",
  cost: "low",
  companionPlants: ["Neem", "Tulsi", "Aloe Vera"]
},
  {
  id: "29",
  name: "Cactus",
  scientificName: "Cactaceae",
  description: "A drought-resistant succulent known for surviving in extreme dry conditions.",
  category: "Succulent",
  difficulty: "Easy",
  image: "/images/others/cactus.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "full",
  growthTime: "Slow growth",
  cost: "low",
  companionPlants: ["Aloe Vera", "Agave"]
},
{
  id: "30",
  name: "Mint",
  scientificName: "Mentha",
  description: "A fast-growing herb used in beverages and cooking.",
  category: "Herb",
  difficulty: "Easy",
  image: "/images/others/mint.jpeg",
  waterNeeds: "high",
  sunlightNeeds: "partial",
  growthTime: "30-45 days",
  cost: "low",
  companionPlants: ["Cabbage", "Tomato"]
},
{
  id: "31",
  name: "Parsley",
  scientificName: "Petroselinum crispum",
  description: "A nutritious herb commonly used for garnishing and cooking.",
  category: "Herb",
  difficulty: "Medium",
  image: "/images/others/parsley.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "partial",
  growthTime: "70-90 days",
  cost: "low",
  companionPlants: ["Tomato", "Chives"]
},
{
  id: "32",
  name: "Chili",
  scientificName: "Capsicum frutescens",
  description: "A spicy vegetable widely used in cooking.",
  category: "Vegetable",
  difficulty: "Medium",
  image: "/images/others/chili.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "60-80 days",
  cost: "low",
  companionPlants: ["Tomato", "Basil"]
},
{
  id: "33",
  name: "Dracaena",
  scientificName: "Dracaena",
  description: "An indoor ornamental plant known for its long leaves and air-purifying properties.",
  category: "Indoor",
  difficulty: "Easy",
  image: "/images/others/dracaena.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "partial",
  growthTime: "Slow growth",
  cost: "medium",
  companionPlants: ["Snake Plant", "ZZ Plant"]
},
{
  id: "34",
  name: "ZZ Plant",
  scientificName: "Zamioculcas zamiifolia",
  description: "A hardy indoor plant that thrives in low light and requires minimal care.",
  category: "Indoor",
  difficulty: "Easy",
  image: "/images/others/zz-plant.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "shade",
  growthTime: "Slow growth",
  cost: "medium",
  companionPlants: ["Snake Plant", "Pothos"]
},
{
  id: "35",
  name: "Areca Palm",
  scientificName: "Dypsis lutescens",
  description: "A decorative indoor palm that enhances air quality.",
  category: "Indoor",
  difficulty: "Medium",
  image: "/images/others/areca.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "partial",
  growthTime: "Moderate growth",
  cost: "medium",
  companionPlants: ["Fern", "Peace Lily"]
},
{
  id: "36",
  name: "Rubber Plant",
  scientificName: "Ficus elastica",
  description: "A popular indoor plant with large glossy leaves.",
  category: "Indoor",
  difficulty: "Easy",
  image: "/images/others/rubber-plant.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "partial",
  growthTime: "Moderate growth",
  cost: "medium",
  companionPlants: ["Snake Plant", "Pothos"]
},
{
  id: "37",
  name: "Anthurium",
  scientificName: "Anthurium andraeanum",
  description: "A beautiful indoor flowering plant with bright red blooms.",
  category: "Flower",
  difficulty: "Medium",
  image: "/images/others/anthurium.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "partial",
  growthTime: "Slow growth",
  cost: "high",
  companionPlants: ["Orchid", "Fern"]
},
{
  id: "38",
  name: "Begonia",
  scientificName: "Begonia",
  description: "A decorative flowering plant suitable for indoor and outdoor use.",
  category: "Flower",
  difficulty: "Medium",
  image: "/images/others/begonia.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "partial",
  growthTime: "Moderate growth",
  cost: "medium",
  companionPlants: ["Coleus", "Petunia"]
},
{
  id: "39",
  name: "Calendula",
  scientificName: "Calendula officinalis",
  description: "A medicinal flowering plant known for its healing properties.",
  category: "Medicinal",
  difficulty: "Easy",
  image: "/images/others/calendula.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "45-60 days",
  cost: "low",
  companionPlants: ["Tomato", "Basil"]
},
{
  id: "40",
  name: "Thyme",
  scientificName: "Thymus vulgaris",
  description: "A small aromatic herb used in cooking and medicine.",
  category: "Herb",
  difficulty: "Easy",
  image: "/images/others/thyme.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "full",
  growthTime: "60-90 days",
  cost: "low",
  companionPlants: ["Rosemary", "Lavender"]
},
{
  id: "41",
  name: "Jade Plant",
  scientificName: "Crassula ovata",
  description: "A succulent known as a symbol of prosperity and good luck.",
  category: "Succulent",
  difficulty: "Easy",
  image: "/images/others/jade.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "partial",
  growthTime: "Slow growth",
  cost: "low",
  companionPlants: ["Cactus", "Aloe Vera"]
},
{
  id: "42",
  name: "Coleus",
  scientificName: "Plectranthus scutellarioides",
  description: "A colorful ornamental plant grown for its vibrant leaves.",
  category: "Flower",
  difficulty: "Easy",
  image: "/images/others/coleus.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "partial",
  growthTime: "Fast growth",
  cost: "low",
  companionPlants: ["Begonia", "Petunia"]
},
{
  id: "43",
  name: "English Ivy",
  scientificName: "Hedera helix",
  description: "A climbing plant used for walls and indoor decoration.",
  category: "Indoor",
  difficulty: "Easy",
  image: "/images/others/ivy.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "shade",
  growthTime: "Fast growth",
  cost: "low",
  companionPlants: ["Fern", "Pothos"]
},
{
  id: "44",
  name: "Pothos",
  scientificName: "Epipremnum aureum",
  description: "A trailing indoor plant known for its air-purifying ability.",
  category: "Indoor",
  difficulty: "Easy",
  image: "/images/others/pothos.jpeg",
  waterNeeds: "low",
  sunlightNeeds: "partial",
  growthTime: "Fast growth",
  cost: "low",
  companionPlants: ["Snake Plant", "ZZ Plant"]
},
{
  id: "45",
  name: "Geranium",
  scientificName: "Pelargonium",
  description: "A colorful flowering plant ideal for gardens and balconies.",
  category: "Flower",
  difficulty: "Easy",
  image: "/images/others/geranium.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "60-90 days",
  cost: "medium",
  companionPlants: ["Petunia", "Marigold"]
},
{
  id: "46",
  name: "Petunia",
  scientificName: "Petunia",
  description: "A popular ornamental flower with vibrant colors.",
  category: "Flower",
  difficulty: "Easy",
  image: "/images/others/petunia.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "45-60 days",
  cost: "low",
  companionPlants: ["Geranium", "Marigold"]
},
{
  id: "47",
  name: "Dahlia",
  scientificName: "Dahlia",
  description: "A vibrant flowering plant with large decorative blooms.",
  category: "Flower",
  difficulty: "Medium",
  image: "/images/others/dahlia.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "90-120 days",
  cost: "medium",
  companionPlants: ["Petunia", "Marigold"]
},
{
  id: "48",
  name: "Bonsai",
  scientificName: "Various species",
  description: "A miniature tree grown in containers requiring careful maintenance.",
  category: "Indoor",
  difficulty: "Hard",
  image: "/images/others/bonsai.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "partial",
  growthTime: "Years",
  cost: "high",
  companionPlants: []
},
{
  id: "49",
  name: "Cypress Tree",
  scientificName: "Cupressus",
  description: "An evergreen tree used in landscaping and decoration.",
  category: "Tree",
  difficulty: "Medium",
 image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "Years",
  cost: "medium",
  companionPlants: []
},
{
  id: "50",
  name: "Oak Tree",
  scientificName: "Quercus",
  description: "A strong long-living tree providing shade and ecological value.",
  category: "Tree",
  difficulty: "Medium",
  image: "/images/others/oak.jpeg",
  waterNeeds: "medium",
  sunlightNeeds: "full",
  growthTime: "Years",
  cost: "medium",
  companionPlants: ["Clover"]
}
];

interface SearchPlantsListProps {
  category: string;
  searchQuery: string;
  sortOption: string;
}

const SearchPlantsList: React.FC<SearchPlantsListProps> = ({ 
  category, 
  searchQuery,
  sortOption
}) => {
  // Filter plants based on category
  let filteredPlants = category === "all" 
    ? plantsData 
    : plantsData.filter(plant => 
        plant.category.toLowerCase() === category.toLowerCase()
      );
  
  // Filter based on search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPlants = filteredPlants.filter(plant => 
      plant.name.toLowerCase().includes(query) || 
      plant.scientificName.toLowerCase().includes(query) ||
      plant.description.toLowerCase().includes(query)
    );
  }
  
  // Sort plants based on the selected option
  switch (sortOption) {
    case "low-cost":
      filteredPlants = [...filteredPlants].sort((a, b) => {
        const costMap: Record<string, number> = {
          "very low": 1, "low": 2, "medium": 3, "high": 4, "very high": 5
        };
        return (costMap[a.cost.toLowerCase()] || 3) - (costMap[b.cost.toLowerCase()] || 3);
      });
      break;
    case "high-cost":
      filteredPlants = [...filteredPlants].sort((a, b) => {
        const costMap: Record<string, number> = {
          "very low": 1, "low": 2, "medium": 3, "high": 4, "very high": 5
        };
        return (costMap[b.cost.toLowerCase()] || 3) - (costMap[a.cost.toLowerCase()] || 3);
      });
      break;
    case "easy-grow":
      filteredPlants = [...filteredPlants].sort((a, b) => {
       const difficultyMap: Record<string, number> = { easy: 1,medium: 2,hard: 3 };
          return (difficultyMap[a.difficulty.toLowerCase()] || 3) - (difficultyMap[b.difficulty.toLowerCase()] || 3);
      });
      break;
    // Add other sort options as needed
    default:
      // Keep default order (most relevant)
      break;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPlants.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No plants found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        filteredPlants.map(plant => (
          <Link to={`/plant-info/${plant.id}`} key={plant.id}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={plant.image} 
                  alt={plant.name} 
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{plant.name}</h3>
                    <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
                  </div>
                  <Badge variant="outline">{plant.category}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{plant.description}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-xs capitalize">{plant.waterNeeds}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs capitalize">{plant.sunlightNeeds}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="text-xs">{plant.growthTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-xs capitalize">{plant.cost}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-xs">{plant.difficulty}</Badge>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchPlantsList;

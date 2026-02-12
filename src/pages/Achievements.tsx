
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Award, Trophy, Target, Users, Calendar, Leaf, Droplet, 
  Star, Gift, AlertCircle, Check, Lock, TrendingUp, BarChart4 
} from "lucide-react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Mock data structure - this would come from backend in real app
const achievementsData = {
  level: 3,
  currentXp: 240,
  nextLevelXp: 300,
  title: "Budding Gardener",
  badges: [
    { 
      id: 1, 
      name: "Sprout Starter", 
      icon: "🌱", 
      description: "Added first plant to your garden", 
      achieved: true, 
      date: "2023-03-15" 
    },
    { 
      id: 2, 
      name: "Green Thumb", 
      icon: "🌿", 
      description: "Kept a plant alive for 30 days", 
      achieved: true, 
      date: "2023-04-20" 
    },
    { 
      id: 3, 
      name: "Watering Pro", 
      icon: "💧", 
      description: "Completed 50 watering reminders", 
      achieved: false, 
      progress: 28, 
      total: 50 
    },
    { 
      id: 4, 
      name: "Master Gardener", 
      icon: "🏡", 
      description: "Grew 10+ different plant species", 
      achieved: false, 
      progress: 3, 
      total: 10 
    },
    { 
      id: 5, 
      name: "Pest Detective", 
      icon: "🐛", 
      description: "Identified & treated a plant disease", 
      achieved: false, 
      progress: 0, 
      total: 1 
    },
    { 
      id: 6, 
      name: "Eco-Friendly Gardener", 
      icon: "🌍", 
      description: "Used organic gardening practices for a month", 
      achieved: true, 
      date: "2023-05-10" 
    },
  ],
  stats: {
    totalPlants: 6,
    longestLivingPlant: {
      name: "Peace Lily",
      days: 124
    },
    waterSaved: "12.5 gallons",
    streakDays: 8
  },
  challenges: [
    {
      id: 101,
      title: "7-Day Watering Streak",
      description: "Water your plants for 7 consecutive days",
      icon: "💦",
      progress: 4,
      total: 7,
      xpReward: 50,
      endDate: "2023-06-30"
    },
    {
      id: 102,
      title: "Grow Your First Herb Garden",
      description: "Add at least 3 different herbs to your garden",
      icon: "🌿",
      progress: 2,
      total: 3,
      xpReward: 75,
      endDate: "2023-07-15"
    },
    {
      id: 103,
      title: "Save a Dying Plant",
      description: "Revive a plant that's in poor health",
      icon: "🌱",
      progress: 0,
      total: 1,
      xpReward: 100,
      endDate: "2023-08-01"
    }
  ],
  seasonalChallenges: [
    {
      id: 201,
      title: "Spring into Gardening",
      description: "Plant a new seed and track its growth",
      icon: "🌸",
      progress: 1,
      total: 1,
      xpReward: 80,
      endDate: "2023-06-21",
      completed: true
    },
    {
      id: 202,
      title: "Beat the Heat",
      description: "Maintain optimal watering during hot days",
      icon: "☀️",
      progress: 3,
      total: 10,
      xpReward: 100,
      endDate: "2023-09-21",
      completed: false
    }
  ],
  monthlyChallenge: {
    id: 301,
    title: "Mystery Garden Mission: Plant Love",
    description: "Gift or swap a plant with someone",
    icon: "💕",
    progress: 0,
    total: 1,
    xpReward: 100,
    endDate: "2023-06-30",
    completed: false
  },
  leaderboard: [
    { rank: 1, name: "GreenThumb2023", level: 8, xp: 4205 },
    { rank: 2, name: "PlantWhisperer", level: 7, xp: 3750 },
    { rank: 3, name: "GardenGuru", level: 7, xp: 3520 },
    { rank: 4, name: "BloomingMadly", level: 6, xp: 2980 },
    { rank: 5, name: "TropicalTamer", level: 5, xp: 2430 }
  ],
  teams: [
    { 
      id: 401,
      name: "Plant Buddies",
      members: ["GardenGuru", "PlantWhisperer"],
      challenge: "Community Garden",
      progress: 75,
      reward: "150 XP & Team Badge"
    },
    { 
      id: 402,
      name: "Green Giants",
      members: ["TropicalTamer", "BloomingMadly", "FoliageFanatic"],
      challenge: "Biggest Harvest",
      progress: 50,
      reward: "200 XP & Featured on Leaderboard"
    }
  ],
  gardeningLevels: [
    { level: 1, title: "Seedling", xpRequired: 0 },
    { level: 2, title: "Sprout", xpRequired: 50 },
    { level: 3, title: "Budding Gardener", xpRequired: 150 },
    { level: 4, title: "Blooming Enthusiast", xpRequired: 300 },
    { level: 5, title: "Urban Grower", xpRequired: 600 },
    { level: 6, title: "Sustainable Gardener", xpRequired: 1000 },
    { level: 7, title: "Community Cultivator", xpRequired: 1500 },
    { level: 8, title: "Eco-Friendly Expert", xpRequired: 2500 },
    { level: 9, title: "Master Gardener", xpRequired: 5000 },
    { level: 10, title: "Legendary Botanist", xpRequired: 10000 }
  ]
};

const Achievements = () => {
  const [activeTab, setActiveTab] = useState("badges");
  const [showLevelsInfo, setShowLevelsInfo] = useState(false);
  
  // Calculate percentage to next level
  const percentToNextLevel = Math.min(
    Math.round((achievementsData.currentXp / achievementsData.nextLevelXp) * 100),
    100
  );
  
  const handleClaimReward = (challengeId: number) => {
    toast.success("Reward claimed! You earned XP!");
    // Logic to claim reward would go here
  };

  const handleJoinTeam = () => {
    toast.success("Team invitation sent!");
    // Logic to join team would go here
  };

  return (
    <DashboardLayout title="My Achievements">
      <div className="py-6">
        {/* Level Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Level {achievementsData.level}: {achievementsData.title}
                  </CardTitle>
                  <CardDescription>Keep growing to unlock more rewards!</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="py-1">
                    <Leaf className="h-3 w-3 mr-1" /> {achievementsData.currentXp} XP
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowLevelsInfo(!showLevelsInfo)}
                  >
                    Levels Info
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress to Level {achievementsData.level + 1}</span>
                  <span>{achievementsData.currentXp} / {achievementsData.nextLevelXp} XP</span>
                </div>
                <Progress value={percentToNextLevel} className="h-2" />
              </div>
              
              <Collapsible 
                open={showLevelsInfo} 
                onOpenChange={setShowLevelsInfo}
                className="mt-4 border rounded-md"
              >
                <CollapsibleContent className="p-4">
                  <h3 className="font-medium mb-3">Gardener Rank Progression</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    {achievementsData.gardeningLevels.map((level) => (
                      <div 
                        key={level.level} 
                        className={`p-2 rounded-md border ${
                          level.level === achievementsData.level 
                            ? 'bg-primary/10 border-primary' 
                            : 'bg-background'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="font-medium">{level.level}. {level.title}</span>
                          {level.level === achievementsData.level && 
                            <Badge variant="secondary" className="ml-2 text-xs">Current</Badge>
                          }
                        </div>
                        <div className="text-muted-foreground text-xs mt-1">
                          {level.xpRequired} XP Required
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Leaf className="h-4 w-4 mr-1 text-green-500" />
                Total Plants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievementsData.stats.totalPlants}</div>
              <p className="text-xs text-muted-foreground mt-1">Plants in your garden</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                Longest Living Plant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievementsData.stats.longestLivingPlant.days} days</div>
              <p className="text-xs text-muted-foreground mt-1">
                {achievementsData.stats.longestLivingPlant.name}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Droplet className="h-4 w-4 mr-1 text-blue-400" />
                Water Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievementsData.stats.waterSaved}</div>
              <p className="text-xs text-muted-foreground mt-1">Through efficient watering</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-orange-500" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievementsData.stats.streakDays} days</div>
              <p className="text-xs text-muted-foreground mt-1">Of continuous plant care</p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Main Tabs Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs 
            defaultValue="badges" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 md:w-auto w-full mb-6">
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            {/* Badges Tab */}
            <TabsContent value="badges" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {achievementsData.badges.map((badge) => (
                  <Card key={badge.id} className={`${badge.achieved ? 'border-primary/30' : 'border-dashed'}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg flex items-center">
                          <span className="text-xl mr-2">{badge.icon}</span>
                          {badge.name}
                        </span>
                        {badge.achieved ? (
                          <Badge className="bg-green-500">Earned</Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                      
                      {badge.achieved ? (
                        <p className="text-xs mt-2 text-muted-foreground">
                          Achieved on {new Date(badge.date).toLocaleDateString()}
                        </p>
                      ) : (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress:</span>
                            <span>{badge.progress} / {badge.total}</span>
                          </div>
                          <Progress value={(badge.progress / badge.total) * 100} className="h-1" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Challenges Tab */}
            <TabsContent value="challenges" className="space-y-4">
              <div className="space-y-4">
                {/* Monthly Mystery Challenge */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg flex items-center">
                        <Gift className="h-5 w-5 mr-2 text-primary" />
                        Monthly Mystery Mission
                      </CardTitle>
                      <Badge variant="outline" className="py-1">
                        {new Date(achievementsData.monthlyChallenge.endDate).toLocaleDateString()} Deadline
                      </Badge>
                    </div>
                    <CardDescription>
                      Complete for {achievementsData.monthlyChallenge.xpReward} XP and a special badge!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-lg mb-2">
                      <span className="text-xl mr-2">{achievementsData.monthlyChallenge.icon}</span>
                      <span className="font-medium">{achievementsData.monthlyChallenge.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievementsData.monthlyChallenge.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span>{achievementsData.monthlyChallenge.progress} / {achievementsData.monthlyChallenge.total}</span>
                      </div>
                      <Progress 
                        value={(achievementsData.monthlyChallenge.progress / achievementsData.monthlyChallenge.total) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Regular Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievementsData.challenges.map((challenge) => (
                    <Card key={challenge.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-md flex items-center">
                            <span className="text-xl mr-2">{challenge.icon}</span>
                            {challenge.title}
                          </CardTitle>
                          <Badge variant="secondary">{challenge.xpReward} XP</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground mb-3">
                          {challenge.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span>{challenge.progress} / {challenge.total}</span>
                          </div>
                          <Progress 
                            value={(challenge.progress / challenge.total) * 100} 
                            className="h-2" 
                          />
                          <div className="text-xs text-muted-foreground">
                            Ends on {new Date(challenge.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        {challenge.progress === challenge.total ? (
                          <Button 
                            className="w-full" 
                            onClick={() => handleClaimReward(challenge.id)}
                          >
                            <Gift className="h-4 w-4 mr-2" />
                            Claim Reward
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full" disabled>
                            <Lock className="h-4 w-4 mr-2" />
                            Complete Challenge
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Seasonal Challenges Tab */}
            <TabsContent value="seasonal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievementsData.seasonalChallenges.map((challenge) => (
                  <Card 
                    key={challenge.id} 
                    className={challenge.completed ? "border-green-500/30 bg-green-50/30" : ""}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <span className="text-xl mr-2">{challenge.icon}</span>
                          {challenge.title}
                        </CardTitle>
                        {challenge.completed ? (
                          <Badge className="bg-green-500">
                            <Check className="h-3 w-3 mr-1" /> Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="py-1">
                            {new Date(challenge.endDate).toLocaleDateString()} Deadline
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        {challenge.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress:</span>
                          <span>{challenge.progress} / {challenge.total}</span>
                        </div>
                        <Progress 
                          value={(challenge.progress / challenge.total) * 100} 
                          className="h-2" 
                        />
                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-muted-foreground">Reward:</span>
                          <span className="font-medium">{challenge.xpReward} XP + Seasonal Badge</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {challenge.completed ? (
                        <Button variant="outline" className="w-full" disabled>
                          <Trophy className="h-4 w-4 mr-2 text-green-500" />
                          Reward Claimed
                        </Button>
                      ) : challenge.progress === challenge.total ? (
                        <Button 
                          className="w-full" 
                          onClick={() => handleClaimReward(challenge.id)}
                        >
                          <Gift className="h-4 w-4 mr-2" />
                          Claim Reward
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Challenge Details
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart4 className="h-5 w-5 mr-2 text-primary" />
                    Upcoming Seasonal Challenges
                  </CardTitle>
                  <CardDescription>
                    Get ready for these seasonal challenges coming soon!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="text-2xl mr-3">🍂</div>
                      <div>
                        <h4 className="font-medium">Fall into Gardening</h4>
                        <p className="text-sm text-muted-foreground">
                          Collect and compost autumn leaves. Prepare your garden for the upcoming season.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Starts September 22nd
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start">
                      <div className="text-2xl mr-3">❄️</div>
                      <div>
                        <h4 className="font-medium">Cozy Plant Care</h4>
                        <p className="text-sm text-muted-foreground">
                          Keep your plants happy during the winter months. 
                          Set up a cozy indoor jungle to beat the cold.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Starts December 21st
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Vote on Future Challenges
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Community Tab */}
            <TabsContent value="community" className="space-y-4">
              {/* Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                    Top Gardeners
                  </CardTitle>
                  <CardDescription>
                    See how you compare to other gardeners in the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {achievementsData.leaderboard.map((user) => (
                      <div 
                        key={user.rank} 
                        className={`flex items-center justify-between p-2 rounded-md
                          ${user.rank === 1 ? 'bg-amber-50 border border-amber-200' : 
                            user.rank === 2 ? 'bg-slate-50 border border-slate-200' : 
                            user.rank === 3 ? 'bg-orange-50 border border-orange-200' : 'bg-background border'}`
                        }
                      >
                        <div className="flex items-center">
                          <span className="font-bold w-6 text-center">{user.rank}</span>
                          <span className="ml-2 font-medium">{user.name}</span>
                          {user.rank <= 3 && (
                            <Badge variant="outline" className="ml-2 py-px">
                              {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Badge variant="secondary" className="mr-2">
                            Level {user.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {user.xp} XP
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Team Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-500" />
                    Team Challenges
                  </CardTitle>
                  <CardDescription>
                    Join forces with other gardeners to unlock special rewards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievementsData.teams.map((team) => (
                      <div key={team.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{team.name}</h4>
                          <Badge variant="outline">
                            {team.members.length} Members
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Challenge: <span className="font-medium">{team.challenge}</span>
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mb-3">
                          <span>Members: </span>
                          <span className="ml-1">{team.members.join(", ")}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span>{team.progress}%</span>
                          </div>
                          <Progress value={team.progress} className="h-2" />
                          <div className="text-sm flex justify-between">
                            <span className="text-muted-foreground">Reward:</span>
                            <span>{team.reward}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button className="w-full mt-2" onClick={handleJoinTeam}>
                      <Users className="h-4 w-4 mr-2" />
                      Create or Join a Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Challenge Submission */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-500" />
                    Submit Your Challenge Idea
                  </CardTitle>
                  <CardDescription>
                    Create a challenge that could be featured for the whole community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If your challenge is selected, you'll receive 250 XP and a special "Challenge Creator" badge!
                  </p>
                  <Button className="w-full">
                    Submit a Challenge Idea
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Achievements;

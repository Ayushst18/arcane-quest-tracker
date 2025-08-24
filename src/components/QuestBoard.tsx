import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useQuestQueue } from "@/contexts/QuestQueueContext";
import { 
  CheckCircle2, 
  Clock, 
  Dumbbell, 
  Brain, 
  Code, 
  BookOpen,
  Zap,
  Target,
  Trophy,
  Play,
  Calculator,
  Database,
  BarChart3,
  TrendingUp,
  Bot,
  Cloud,
  Users
} from "lucide-react";

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Very Hard' | 'Extreme';
  exp: number;
  type: 'lifestyle' | 'aiml';
  category: string;
  completed: boolean;
  timeEstimate: string;
  streak?: number;
}

// Structured AI/ML Learning Path
const aimlQuestStructure = {
  "Foundation Skills": {
    icon: BookOpen,
    sections: {
      "Programming": {
        icon: Code,
        subsections: {
          "Python": [
            {
              id: 'python-intro',
              title: 'Introduction to Python syntax',
              description: 'Learn basic Python syntax, indentation, and code structure',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '45 min',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-vars',
              title: 'Variables & Data Types',
              description: 'Master Python variables, integers, floats, strings, and booleans',
              difficulty: 'Easy' as const,
              exp: 20, 
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '45 min',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-strings',
              title: 'Strings & String Methods',
              description: 'Work with string manipulation, formatting, and built-in methods',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-lists',
              title: 'Lists & List Methods',
              description: 'Understand lists, indexing, slicing, and list methods',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-tuples',
              title: 'Tuples',
              description: 'Learn about immutable sequences and tuple operations',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '30 min',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-sets',
              title: 'Sets',
              description: 'Master set operations, uniqueness, and mathematical set operations',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '30 min',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-dicts',
              title: 'Dictionaries',
              description: 'Work with key-value pairs, dictionary methods, and data structures',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-conditionals',
              title: 'Conditional Statements (if-else)',
              description: 'Master decision making with if, elif, else statements',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '45 min',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-loops',
              title: 'Loops (for, while)',
              description: 'Learn iteration with for loops, while loops, and loop control',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-functions',
              title: 'Functions (def, return, arguments, keyword args)',
              description: 'Create reusable code with functions, parameters, and return values',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-lambda',
              title: 'Lambda Functions',
              description: 'Understand anonymous functions and functional programming concepts',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-comprehensions',
              title: 'List Comprehensions',
              description: 'Master concise list creation and nested comprehensions',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-files',
              title: 'File Handling (read, write, append)',
              description: 'Work with file I/O operations and context managers',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-exceptions',
              title: 'Exception Handling',
              description: 'Handle errors gracefully with try-except blocks',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-modules',
              title: 'Modules & Packages (import, custom modules)',
              description: 'Organize code with modules, packages, and import systems',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-venv',
              title: 'Virtual Environments (venv, pipenv)',
              description: 'Manage project dependencies and isolated environments',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-libraries',
              title: 'Working with Libraries (NumPy, Pandas basics)',
              description: 'Introduction to essential data science libraries',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-oop',
              title: 'Object-Oriented Programming (Classes, Objects, Inheritance, Polymorphism)',
              description: 'Master OOP principles and design patterns in Python',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '4 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'python-debugging',
              title: 'Python Debugging Tools (pdb, logging)',
              description: 'Debug code effectively with built-in tools and logging',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            }
          ],
          "SQL": [
            {
              id: 'sql-intro',
              title: 'Introduction to Databases & SQL syntax',
              description: 'Understand relational databases and basic SQL structure',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-select',
              title: 'SELECT Statements',
              description: 'Query data with SELECT, FROM, and basic filtering',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '45 min',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-where',
              title: 'WHERE Clauses & Operators',
              description: 'Filter data with conditions and comparison operators',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-order',
              title: 'ORDER BY & LIMIT',
              description: 'Sort results and limit output for better data analysis',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '45 min',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-cud',
              title: 'INSERT, UPDATE, DELETE',
              description: 'Modify data with CRUD operations',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-aggregate',
              title: 'Aggregate Functions (SUM, AVG, COUNT, MAX, MIN)',
              description: 'Perform calculations on groups of data',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-group',
              title: 'GROUP BY & HAVING',
              description: 'Filter groups with aggregate conditions',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-joins',
              title: 'JOINs (INNER, LEFT, RIGHT, FULL)',
              description: 'Combine data from multiple tables with different join types',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-subqueries',
              title: 'Subqueries',
              description: 'Write complex queries with nested SELECT statements',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-indexes',
              title: 'Indexes & Performance Tuning',
              description: 'Optimize query performance with indexes and best practices',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'sql-normalization',
              title: 'Basic Database Normalization',
              description: 'Design efficient database schemas with normalization principles',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            }
          ]
        }
      },
      "Mathematics": {
        icon: Calculator,
        subsections: {
          "Linear Algebra": [
            {
              id: 'la-scalars-vectors',
              title: 'Scalars, Vectors, Matrices',
              description: 'Understand fundamental mathematical objects in linear algebra',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'la-matrix-ops',
              title: 'Matrix Operations (addition, multiplication)',
              description: 'Perform basic operations on matrices and understand properties',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'la-dot-cross',
              title: 'Dot Product & Cross Product',
              description: 'Calculate vector products and understand geometric interpretations',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'la-transpose',
              title: 'Matrix Transpose',
              description: 'Understand matrix transposition and its properties',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '45 min',
              completed: false,
              streak: 0,
            },
            {
              id: 'la-determinant',
              title: 'Determinants & Inverse',
              description: 'Calculate determinants and matrix inverses for square matrices',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'la-eigenvalues',
              title: 'Eigenvalues & Eigenvectors',
              description: 'Find eigenvalues and eigenvectors, crucial for PCA and other ML techniques',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'la-orthogonality',
              title: 'Orthogonality & Orthonormality',
              description: 'Understand orthogonal vectors and orthonormal bases',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            }
          ],
          "Calculus": [
            {
              id: 'calc-functions',
              title: 'Functions & Limits',
              description: 'Understand mathematical functions and limit concepts',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'calc-derivatives',
              title: 'Derivatives (basic rules)',
              description: 'Learn differentiation rules and basic derivative calculations',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'calc-chain-rule',
              title: 'Chain Rule',
              description: 'Master the chain rule for composite functions',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'calc-partial',
              title: 'Partial Derivatives',
              description: 'Calculate partial derivatives for multivariable functions',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'calc-gradients',
              title: 'Gradients & Gradient Vectors',
              description: 'Understand gradients and their role in optimization',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'calc-integration',
              title: 'Integration Basics',
              description: 'Learn basic integration techniques and applications',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'calc-optimization',
              title: 'Optimization in ML (link to gradient descent)',
              description: 'Apply calculus concepts to machine learning optimization',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            }
          ]
        }
      },
      "Statistics & Probability": {
        icon: BarChart3,
        subsections: {
          "Descriptive Statistics": [
            {
              id: 'stats-central',
              title: 'Mean, Median, Mode',
              description: 'Calculate and interpret measures of central tendency',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'stats-spread',
              title: 'Variance & Standard Deviation',
              description: 'Understand measures of spread and variability',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'stats-quartiles',
              title: 'Quartiles & IQR',
              description: 'Calculate quartiles and interquartile range',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'stats-skew',
              title: 'Skewness & Kurtosis',
              description: 'Analyze distribution shape with skewness and kurtosis',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            }
          ],
          "Probability Distributions": [
            {
              id: 'prob-uniform',
              title: 'Uniform Distribution',
              description: 'Understand uniform probability distributions',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'prob-normal',
              title: 'Normal (Gaussian) Distribution',
              description: 'Master the most important probability distribution in statistics',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'prob-binomial',
              title: 'Binomial Distribution',
              description: 'Understand discrete probability with binomial distributions',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'prob-poisson',
              title: 'Poisson Distribution',
              description: 'Model rare events with Poisson distributions',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Foundation Skills',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            }
          ]
        }
      }
    }
  },
  "Data Management & Exploration": {
    icon: Database,
    sections: {
      "Data Wrangling & EDA": {
        icon: Target,
        subsections: {
          "Core Skills": [
            {
              id: 'data-collection',
              title: 'Data Collection Sources',
              description: 'Identify and access various data sources for ML projects',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Data Management',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'data-reading',
              title: 'Reading CSV/Excel/JSON files',
              description: 'Load data from common file formats into Python',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Data Management',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'data-missing',
              title: 'Handling Missing Values (drop, impute)',
              description: 'Deal with missing data using various strategies',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Data Management',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'data-duplicates',
              title: 'Removing Duplicates',
              description: 'Identify and handle duplicate records in datasets',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Data Management',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'data-types',
              title: 'Data Type Conversion',
              description: 'Convert between different data types for analysis',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Data Management',
              timeEstimate: '1 hour',
              completed: false,
              streak: 0,
            },
            {
              id: 'data-encoding',
              title: 'Encoding Categorical Variables (Label, One-Hot)',
              description: 'Transform categorical data for machine learning models',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Data Management',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'data-scaling',
              title: 'Normalization & Standardization',
              description: 'Scale numerical features for optimal model performance',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Data Management',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'data-outliers',
              title: 'Detecting Outliers (IQR, Z-score)',
              description: 'Identify and handle outliers in your data',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Data Management',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'data-eda',
              title: 'Basic EDA with Pandas',
              description: 'Perform exploratory data analysis using Pandas',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Data Management',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            }
          ]
        }
      }
    }
  },
  "Machine Learning": {
    icon: Brain,
    sections: {
      "Supervised Learning": {
        icon: Target,
        subsections: {
          "Regression": [
            {
              id: 'ml-linear',
              title: 'Simple Linear Regression',
              description: 'Build your first regression model with single variables',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'ml-multiple',
              title: 'Multiple Linear Regression',
              description: 'Extend to multiple features in regression models',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '2.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'ml-polynomial',
              title: 'Polynomial Regression',
              description: 'Handle non-linear relationships with polynomial features',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'ml-regularization',
              title: 'Regularization (Ridge, Lasso, ElasticNet)',
              description: 'Prevent overfitting with regularization techniques',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'ml-logistic',
              title: 'Logistic Regression',
              description: 'Classify data using logistic regression',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '2.5 hours',
              completed: false,
              streak: 0,
            }
          ],
          "Classification": [
            {
              id: 'ml-trees',
              title: 'Decision Trees',
              description: 'Build interpretable models with decision trees',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '2.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'ml-forest',
              title: 'Random Forests',
              description: 'Combine multiple trees for better performance',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'ml-svm',
              title: 'SVM (Linear & Kernel)',
              description: 'Classify data with support vector machines',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '3.5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'ml-naive-bayes',
              title: 'Naive Bayes',
              description: 'Use probabilistic classification with Naive Bayes',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'ml-knn',
              title: 'k-Nearest Neighbors',
              description: 'Classify based on similarity with k-NN',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Machine Learning',
              timeEstimate: '1.5 hours',
              completed: false,
              streak: 0,
            }
          ]
        }
      }
    }
  },
  "Deep Learning": {
    icon: Zap,
    sections: {
      "Neural Network Basics": {
        icon: Brain,
        subsections: {
          "Fundamentals": [
            {
              id: 'dl-perceptrons',
              title: 'Perceptrons',
              description: 'Understand the basic building blocks of neural networks',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Deep Learning',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'dl-backprop',
              title: 'Forward & Backpropagation',
              description: 'Learn how neural networks learn through backpropagation',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Deep Learning',
              timeEstimate: '4 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'dl-activation',
              title: 'Activation Functions (Sigmoid, ReLU, Tanh, Softmax)',
              description: 'Understand different activation functions and their use cases',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Deep Learning',
              timeEstimate: '2.5 hours',
              completed: false,
              streak: 0,
            }
          ]
        }
      }
    }
  },
  "Generative AI": {
    icon: Bot,
    sections: {
      "Foundation": {
        icon: Zap,
        subsections: {
          "Core Concepts": [
            {
              id: 'gen-transformer',
              title: 'Transformer Architecture',
              description: 'Understand the architecture that powers modern AI',
              difficulty: 'Very Hard' as const,
              exp: 320,
              type: 'aiml' as const,
              category: 'Generative AI',
              timeEstimate: '6 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'gen-attention',
              title: 'Self-Attention Mechanism',
              description: 'Deep dive into the attention mechanism',
              difficulty: 'Very Hard' as const,
              exp: 320,
              type: 'aiml' as const,
              category: 'Generative AI',
              timeEstimate: '5 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'gen-tokenization',
              title: 'Tokenization Methods (BPE, WordPiece)',
              description: 'Learn how text is processed for language models',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Generative AI',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'gen-prompting',
              title: 'Prompt Engineering Basics',
              description: 'Master the art of communicating with AI models',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Generative AI',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'gen-rag',
              title: 'RAG Systems',
              description: 'Build Retrieval-Augmented Generation systems',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Generative AI',
              timeEstimate: '4 hours',
              completed: false,
              streak: 0,
            }
          ]
        }
      }
    }
  },
  "Big Data & Infrastructure": {
    icon: Cloud,
    sections: {
      "Platforms": {
        icon: Cloud,
        subsections: {
          "Core Technologies": [
            {
              id: 'big-spark',
              title: 'Apache Spark Basics',
              description: 'Process large datasets with Apache Spark',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Big Data',
              timeEstimate: '4 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'big-hadoop',
              title: 'Hadoop Overview',
              description: 'Understand distributed storage and processing',
              difficulty: 'Hard' as const,
              exp: 160,
              type: 'aiml' as const,
              category: 'Big Data',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'big-aws',
              title: 'AWS S3, EC2, SageMaker Basics',
              description: 'Deploy ML models on Amazon Web Services',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Big Data',
              timeEstimate: '3 hours',
              completed: false,
              streak: 0,
            }
          ]
        }
      }
    }
  },
  "Professional Skills": {
    icon: Users,
    sections: {
      "Development": {
        icon: Code,
        subsections: {
          "Version Control": [
            {
              id: 'prof-git',
              title: 'Git Basics (init, commit, branch, merge)',
              description: 'Master version control with Git',
              difficulty: 'Easy' as const,
              exp: 20,
              type: 'aiml' as const,
              category: 'Professional Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            },
            {
              id: 'prof-github',
              title: 'GitHub/GitLab Collaboration',
              description: 'Collaborate on projects using GitHub',
              difficulty: 'Normal' as const,
              exp: 50,
              type: 'aiml' as const,
              category: 'Professional Skills',
              timeEstimate: '2 hours',
              completed: false,
              streak: 0,
            }
          ]
        }
      }
    }
  }
};

// Lifestyle Quests
const lifestyleQuests: Quest[] = [
  {
    id: 'wake7am',
    title: 'Wake up at 7 AM',
    description: 'Start your day early and maintain a consistent sleep schedule',
    difficulty: 'Easy',
    exp: 20,
    type: 'lifestyle',
    category: 'Daily',
    completed: true,
    streak: 5,
    timeEstimate: '0 min'
  },
  {
    id: 'gym-chest',
    title: 'Chest & Triceps Workout',
    description: 'Complete your Tuesday workout routine',
    difficulty: 'Normal',
    exp: 50,
    type: 'lifestyle', 
    category: 'Fitness',
    completed: false,
    timeEstimate: '60 mins',
    streak: 0
  },
  {
    id: 'water6l',
    title: 'Drink 6L Water',
    description: 'Stay hydrated throughout the day',
    difficulty: 'Easy',
    exp: 30,
    type: 'lifestyle',
    category: 'Health',
    completed: false,
    streak: 3,
    timeEstimate: '0 min'
  }
];

export const QuestBoard = () => {
  const { toast } = useToast();
  const { addQuestToQueue } = useQuestQueue();

  const handleStartQuest = (quest: Quest) => {
    addQuestToQueue(quest);
    toast({
      title: "Quest Added to Queue!",
      description: `${quest.title} has been added to your quest queue.`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
      Normal: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Hard: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Very Hard': 'bg-red-500/20 text-red-400 border-red-500/30',
      Extreme: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return colors[difficulty] || 'bg-gray-500/20 text-gray-400';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      Daily: Clock,
      Fitness: Dumbbell,
      Health: Target,
      'AI/ML Learning Path': Brain,
      'Foundation Skills': BookOpen,
      'Data Management': Database,
      'Machine Learning': Brain,
      'Deep Learning': Zap,
      'Generative AI': Bot,
      'Big Data': Cloud,
      'Professional Skills': Users
    };
    return icons[category] || Trophy;
  };

  const QuestCard = ({ quest }: { quest: Quest }) => {
    const IconComponent = getCategoryIcon(quest.category);
    
    return (
      <Card className="quest-card glow transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <IconComponent className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-lg leading-tight">{quest.title}</CardTitle>
                {quest.timeEstimate && (
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{quest.timeEstimate}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={getDifficultyColor(quest.difficulty)}>
                {quest.difficulty}
              </Badge>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                +{quest.exp} EXP
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm mb-4 leading-relaxed">
            {quest.description}
          </CardDescription>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {quest.streak && quest.streak > 0 && (
                <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/30">
                  🔥 {quest.streak} day streak
                </Badge>
              )}
            </div>
            
            {quest.completed ? (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            ) : (
              <Button 
                onClick={() => handleStartQuest(quest)}
                size="sm"
                className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/30"
                variant="outline"
              >
                <Play className="h-3 w-3 mr-1" />
                Start Quest
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="lifestyle" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lifestyle" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            Lifestyle Quests
          </TabsTrigger>
          <TabsTrigger value="aiml" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI/ML Learning Path
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lifestyle" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {lifestyleQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="aiml" className="space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {Object.entries(aimlQuestStructure).map(([sectionName, sectionData]) => {
              const SectionIcon = sectionData.icon;
              return (
                <AccordionItem key={sectionName} value={sectionName} className="border border-border rounded-lg bg-card/50">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <SectionIcon className="h-6 w-6 text-primary" />
                      <span className="text-lg font-semibold">{sectionName}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <Accordion type="single" collapsible className="w-full space-y-2">
                      {Object.entries(sectionData.sections).map(([subsectionName, subsectionData]) => {
                        const SubsectionIcon = subsectionData.icon;
                        return (
                          <AccordionItem key={subsectionName} value={subsectionName} className="border border-border/50 rounded-md">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 rounded-t-md">
                              <div className="flex items-center gap-2">
                                <SubsectionIcon className="h-5 w-5 text-accent" />
                                <span className="font-medium">{subsectionName}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4">
                              <Accordion type="single" collapsible className="w-full space-y-2">
                                {Object.entries(subsectionData.subsections).map(([topicName, quests]: [string, Quest[]]) => (
                                  <AccordionItem key={topicName} value={topicName} className="border border-border/30 rounded-sm">
                                    <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-muted/20 rounded-t-sm text-sm">
                                      <span className="font-medium text-muted-foreground">{topicName}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-3 pb-3">
                                      <div className="grid grid-cols-1 gap-4">
                                        {quests.map((quest) => (
                                          <QuestCard key={quest.id} quest={quest} />
                                        ))}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};
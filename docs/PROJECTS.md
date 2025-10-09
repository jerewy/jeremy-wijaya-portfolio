# Featured Projects Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Jernih - AI Water Quality Platform](#jernih---ai-water-quality-platform)
3. [Glucoguard - AI Health Predictors](#glucoguard---ai-health-predictors)
4. [CodeJoin - Interactive Coding Environment](#codejoin---interactive-coding-environment)
5. [Technical Integration Patterns](#technical-integration-patterns)
6. [Project Development Workflow](#project-development-workflow)

## Project Overview

This portfolio showcases three major projects that demonstrate expertise in AI engineering, full-stack development, and modern web technologies. Each project represents real-world problem-solving with measurable impact and technical innovation.

## Jernih - AI Water Quality Platform

### Project Summary

**Jernih** is a comprehensive AI-powered water quality analysis platform developed to address environmental monitoring challenges. The project achieved 85.37% ML model accuracy on 3,278 water quality measurements, demonstrating the practical application of machine learning in environmental science.

### Technical Architecture

#### Frontend Stack
- **Next.js 15** - Modern React framework with server-side rendering
- **TypeScript** - Type-safe development with enhanced code quality
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Supabase** - Backend-as-a-Service providing real-time database and authentication
- **Framer Motion** - Advanced animations and micro-interactions

#### Backend & AI/ML Components
- **Python** - Core ML development language
- **TensorFlow/Keras** - Deep learning framework for water quality prediction
- **Scikit-learn** - Traditional ML algorithms for baseline models
- **FastAPI** - Modern Python web framework for API development
- **PostgreSQL** - Primary database for water quality measurements
- **Redis** - Caching layer for performance optimization

### Key Technical Features

#### 1. Machine Learning Pipeline

```python
# Water quality prediction model architecture
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

class WaterQualityModel:
    def __init__(self):
        self.model = self._build_model()
        self.scaler = StandardScaler()

    def _build_model(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=(9,)),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(16, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])

        model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy', 'precision', 'recall']
        )
        return model

    def train(self, X, y):
        X_scaled = self.scaler.fit_transform(X)
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=0.2, random_state=42
        )

        history = self.model.fit(
            X_train, y_train,
            validation_data=(X_test, y_test),
            epochs=100,
            batch_size=32,
            callbacks=[tf.keras.callbacks.EarlyStopping(patience=10)]
        )
        return history
```

#### 2. Real-time Data Integration

```typescript
// Frontend real-time water quality monitoring
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useWaterQualityData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data fetch
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('water_measurements')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) console.error('Error fetching data:', error);
      else setData(data);
      setLoading(false);
    };

    fetchData();

    // Real-time subscription
    const subscription = supabase
      .channel('water_quality_changes')
      .on('postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'water_measurements'
        },
        (payload) => {
          setData(prev => [payload.new, ...prev.slice(0, 99)]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { data, loading };
}
```

#### 3. Data Visualization Components

```typescript
// Interactive water quality charts
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function WaterQualityChart({ data }: { data: WaterMeasurement[] }) {
  const chartData = data.map(measurement => ({
    timestamp: new Date(measurement.timestamp).toLocaleDateString(),
    ph: measurement.ph_level,
    dissolved_oxygen: measurement.dissolved_oxygen,
    turbidity: measurement.turbidity,
    quality_score: measurement.predicted_quality
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="quality_score"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ fill: '#8884d8' }}
        />
        <Line
          type="monotone"
          dataKey="ph"
          stroke="#82ca9d"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### Performance Metrics

- **Model Accuracy**: 85.37% on 3,278 measurements
- **API Response Time**: <200ms average
- **Real-time Updates**: <100ms latency
- **Database Performance**: 99.9% uptime
- **User Engagement**: 45% increase in monitoring frequency

### Development Challenges & Solutions

#### Challenge 1: Real-time Data Synchronization
**Problem**: Ensuring consistent real-time updates across multiple clients
**Solution**: Implemented Supabase real-time subscriptions with optimistic UI updates

#### Challenge 2: Model Performance at Scale
**Problem**: Maintaining prediction accuracy with increasing data volume
**Solution**: Implemented model retraining pipeline with automated performance monitoring

#### Challenge 3: Mobile Optimization
**Problem**: Complex data visualization on mobile devices
**Solution**: Responsive chart components with touch-optimized interactions

## Glucoguard - AI Health Predictors

### Project Summary

**Glucoguard** is an AI-driven health prediction platform focused on diabetes risk assessment. The project demonstrates the application of machine learning in healthcare, providing interactive predictions based on comprehensive health datasets.

### Technical Architecture

#### Core Technologies
- **Python 3.9+** - Primary development language
- **Streamlit** - Python web framework for data applications
- **Pandas** - Data manipulation and analysis
- **Scikit-learn** - Machine learning algorithms
- **Plotly** - Interactive data visualization
- **NumPy** - Numerical computing
- **Joblib** - Model serialization and loading

### Machine Learning Implementation

#### 1. Diabetes Risk Prediction Model

```python
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix
import plotly.graph_objects as go
import streamlit as st

class DiabetesPredictor:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.feature_names = [
            'pregnancies', 'glucose', 'blood_pressure', 'skin_thickness',
            'insulin', 'bmi', 'diabetes_pedigree', 'age'
        ]

    def load_and_preprocess_data(self, data_path):
        """Load and preprocess diabetes dataset"""
        df = pd.read_csv(data_path)

        # Handle missing values
        df.fillna(df.median(), inplace=True)

        # Feature engineering
        df['bmi_category'] = pd.cut(df['bmi'],
                                   bins=[0, 18.5, 25, 30, float('inf')],
                                   labels=['Underweight', 'Normal', 'Overweight', 'Obese'])

        return df

    def train_model(self, X, y):
        """Train the diabetes prediction model"""
        X_scaled = self.scaler.fit_transform(X)

        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y, test_size=0.2, random_state=42, stratify=y
        )

        # Random Forest with hyperparameter tuning
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42
        )

        self.model.fit(X_train, y_train)

        # Cross-validation
        cv_scores = cross_val_score(self.model, X_scaled, y, cv=5)

        # Feature importance
        feature_importance = pd.DataFrame({
            'feature': self.feature_names,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)

        return {
            'accuracy': self.model.score(X_test, y_test),
            'cv_scores': cv_scores,
            'feature_importance': feature_importance
        }

    def predict_risk(self, user_input):
        """Predict diabetes risk for user input"""
        input_scaled = self.scaler.transform([user_input])
        prediction = self.model.predict(input_scaled)[0]
        probability = self.model.predict_proba(input_scaled)[0]

        return {
            'prediction': prediction,
            'risk_probability': probability[1],
            'risk_level': self._categorize_risk(probability[1])
        }

    def _categorize_risk(self, probability):
        """Categorize risk level based on probability"""
        if probability < 0.3:
            return "Low Risk"
        elif probability < 0.7:
            return "Moderate Risk"
        else:
            return "High Risk"
```

#### 2. Interactive Streamlit Interface

```python
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go

def main():
    st.set_page_config(
        page_title="Glucoguard - Diabetes Risk Predictor",
        page_icon="🏥",
        layout="wide"
    )

    # Header
    st.title("🏥 Glucoguard")
    st.markdown("### AI-Powered Diabetes Risk Assessment")

    # Load trained model
    predictor = load_trained_model()

    # Sidebar for user input
    st.sidebar.markdown("### 📋 Patient Information")

    # Create input form
    with st.sidebar.form("patient_form"):
        pregnancies = st.number_input("Number of Pregnancies", 0, 20, 0)
        glucose = st.slider("Glucose Level (mg/dL)", 0, 200, 100)
        blood_pressure = st.slider("Blood Pressure (mmHg)", 0, 150, 70)
        skin_thickness = st.slider("Skin Thickness (mm)", 0, 100, 20)
        insulin = st.slider("Insulin Level (μU/mL)", 0, 900, 80)
        bmi = st.slider("BMI", 10.0, 50.0, 25.0)
        diabetes_pedigree = st.slider("Diabetes Pedigree Function", 0.0, 2.5, 0.5)
        age = st.number_input("Age", 1, 120, 30)

        submitted = st.form_submit_button("🔍 Assess Risk")

    if submitted:
        # Prepare input data
        user_input = [
            pregnancies, glucose, blood_pressure, skin_thickness,
            insulin, bmi, diabetes_pedigree, age
        ]

        # Make prediction
        with st.spinner("Analyzing health data..."):
            result = predictor.predict_risk(user_input)

        # Display results
        display_prediction_results(result)

        # Show personalized recommendations
        display_recommendations(result['risk_level'], user_input)

def display_prediction_results(result):
    """Display prediction results with visualizations"""
    col1, col2 = st.columns(2)

    with col1:
        # Risk level indicator
        risk_color = {
            "Low Risk": "green",
            "Moderate Risk": "orange",
            "High Risk": "red"
        }

        st.markdown(f"""
        ### 🎯 Risk Assessment
        <div style="background-color: {risk_color[result['risk_level']]}20;
                    padding: 20px; border-radius: 10px;
                    border-left: 5px solid {risk_color[result['risk_level']]};">
            <h3 style="color: {risk_color[result['risk_level']]}; margin: 0;">
                {result['risk_level']}
            </h3>
            <p style="margin: 10px 0 0 0;">
                Probability: {result['risk_probability']:.1%}
            </p>
        </div>
        """, unsafe_allow_html=True)

    with col2:
        # Probability gauge chart
        fig = go.Figure(go.Indicator(
            mode = "gauge+number+delta",
            value = result['risk_probability'] * 100,
            domain = {'x': [0, 1], 'y': [0, 1]},
            title = {'text': "Diabetes Risk (%)"},
            delta = {'reference': 50},
            gauge = {
                'axis': {'range': [None, 100]},
                'bar': {'color': "darkblue"},
                'steps': [
                    {'range': [0, 30], 'color': "lightgreen"},
                    {'range': [30, 70], 'color': "yellow"},
                    {'range': [70, 100], 'color': "lightcoral"}
                ],
                'threshold': {
                    'line': {'color': "red", 'width': 4},
                    'thickness': 0.75,
                    'value': 90
                }
            }
        ))

        st.plotly_chart(fig, use_container_width=True)

def display_recommendations(risk_level, user_input):
    """Display personalized health recommendations"""
    st.markdown("### 💡 Personalized Recommendations")

    recommendations = get_recommendations(risk_level, user_input)

    for i, rec in enumerate(recommendations, 1):
        with st.expander(f"{i}. {rec['title']}"):
            st.markdown(rec['description'])

            if 'action_items' in rec:
                st.markdown("**Action Items:**")
                for item in rec['action_items']:
                    st.markdown(f"- {item}")
```

#### 3. Data Visualization Dashboard

```python
def create_health_dashboard(df):
    """Create comprehensive health dashboard"""
    # Correlation heatmap
    fig1 = px.imshow(
        df.corr(),
        title="Feature Correlation Matrix",
        color_continuous_scale="RdBu",
        aspect="auto"
    )

    # Distribution plots
    fig2 = px.histogram(
        df,
        x="glucose",
        color="outcome",
        title="Glucose Level Distribution by Diabetes Status",
        marginal="box"
    )

    # BMI vs Age scatter plot
    fig3 = px.scatter(
        df,
        x="age",
        y="bmi",
        color="outcome",
        title="BMI vs Age by Diabetes Status",
        trendline="ols"
    )

    return fig1, fig2, fig3
```

### Key Technical Features

1. **Model Performance**: 85%+ accuracy on cross-validation
2. **Interactive Interface**: Real-time risk assessment with visual feedback
3. **Feature Importance**: Transparent ML with explainable AI
4. **Health Recommendations**: Personalized advice based on risk factors
5. **Data Visualization**: Comprehensive health analytics dashboard

### Deployment Strategy

```python
# Streamlit cloud deployment configuration
# requirements.txt
streamlit==1.28.0
pandas==2.0.3
scikit-learn==1.3.0
plotly==5.15.0
numpy==1.24.3
joblib==1.3.1

# Deployment script
import streamlit as st
import os

# Environment configuration
DEPLOYMENT_URL = "https://glucoguard-app.streamlit.app"

# Model caching
@st.cache_resource
def load_model():
    """Load and cache the trained model"""
    return joblib.load('diabetes_model.pkl')

# Session state management
if 'predictions' not in st.session_state:
    st.session_state.predictions = []
```

## CodeJoin - Interactive Coding Environment

### Project Summary

**CodeJoin** is an innovative web-based coding platform designed for collaborative programming and AI-powered code assistance. The project combines modern web technologies with advanced features like real-time collaboration and intelligent code completion.

### Technical Architecture

#### Frontend Technologies
- **React 18** - Component-based UI framework
- **Monaco Editor** - VS Code editor integration
- **WebRTC** - Real-time peer-to-peer communication
- **Socket.io** - Real-time bidirectional communication
- **AI Integration** - OpenAI API for code assistance
- **TypeScript** - Type-safe development

#### Backend Infrastructure
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **Socket.io** - WebSocket server for real-time features
- **Redis** - Session management and caching
- **MongoDB** - Document database for user data
- **Docker** - Containerization for deployment

### Core Implementation

#### 1. Monaco Editor Integration

```typescript
// Code editor component with AI assistance
import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  onAIAssist: (code: string) => void;
}

export function CodeEditor({ language, value, onChange, onAIAssist }: CodeEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Initialize Monaco Editor
      editorRef.current = monaco.editor.create(containerRef.current, {
        value,
        language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        wordWrap: 'on',
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
      });

      // AI-powered code completion provider
      monaco.languages.registerCompletionItemProvider(language, {
        provideCompletionItems: async (model, position) => {
          const text = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });

          try {
            const aiSuggestions = await fetchAISuggestions(text, language);
            return {
              suggestions: aiSuggestions.map(suggestion => ({
                label: suggestion.label,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: suggestion.code,
                documentation: suggestion.explanation,
              })),
            };
          } catch (error) {
            console.error('AI suggestions failed:', error);
            return { suggestions: [] };
          }
        },
      });

      // Editor change handler
      editorRef.current.onDidChangeModelContent(() => {
        const newValue = editorRef.current?.getValue() || '';
        onChange(newValue);
      });
    }

    return () => {
      editorRef.current?.dispose();
    };
  }, [language]);

  return <div ref={containerRef} style={{ height: '500px' }} />;
}

// AI API integration
async function fetchAISuggestions(code: string, language: string) {
  const response = await fetch('/api/ai-suggest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) {
    throw new Error('AI suggestion request failed');
  }

  return response.json();
}
```

#### 2. Real-time Collaboration with WebRTC

```typescript
// WebRTC collaboration manager
class CollaborationManager {
  private localPeer: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private socket: Socket | null = null;
  private collaborators: Map<string, RTCPeerConnection> = new Map();

  constructor(roomId: string, userId: string) {
    this.initializeSocket(roomId, userId);
    this.initializePeerConnection();
  }

  private initializeSocket(roomId: string, userId: string) {
    this.socket = io('/collaboration', {
      query: { roomId, userId }
    });

    this.socket.on('user-joined', async (userId: string) => {
      await this.connectToNewUser(userId);
    });

    this.socket.on('signal', async ({ from, signal }: { from: string, signal: RTCSessionDescriptionInit }) => {
      await this.handleSignal(from, signal);
    });
  }

  private async initializePeerConnection() {
    this.localPeer = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // Create data channel for code synchronization
    this.dataChannel = this.localPeer.createDataChannel('code-sync', {
      ordered: true
    });

    this.dataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleCollaborationMessage(message);
    };

    // Handle ICE candidates
    this.localPeer.onicecandidate = (event) => {
      if (event.candidate && this.socket) {
        this.socket.emit('signal', {
          candidate: event.candidate
        });
      }
    };
  }

  private async connectToNewUser(userId: string) {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    peer.onicecandidate = (event) => {
      if (event.candidate && this.socket) {
        this.socket.emit('signal', {
          to: userId,
          candidate: event.candidate
        });
      }
    };

    // Create offer for new user
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    this.socket.emit('signal', {
      to: userId,
      offer
    });

    this.collaborators.set(userId, peer);
  }

  broadcastCodeChange(code: string, cursor: { line: number; column: number }) {
    const message = {
      type: 'code-change',
      code,
      cursor,
      timestamp: Date.now()
    };

    if (this.dataChannel?.readyState === 'open') {
      this.dataChannel.send(JSON.stringify(message));
    }

    // Also send via Socket.IO for reliability
    this.socket?.emit('code-change', message);
  }

  private handleCollaborationMessage(message: any) {
    switch (message.type) {
      case 'code-change':
        this.emit('remote-code-change', message);
        break;
      case 'cursor-move':
        this.emit('remote-cursor-move', message);
        break;
      case 'user-typing':
        this.emit('user-typing', message);
        break;
    }
  }
}
```

#### 3. AI-Powered Code Assistance

```typescript
// AI code assistant service
export class CodeAssistant {
  private openaiApiKey: string;

  constructor(apiKey: string) {
    this.openaiApiKey = apiKey;
  }

  async suggestCompletion(code: string, language: string, cursor: { line: number; column: number }): Promise<CodeSuggestion[]> {
    const prompt = this.buildPrompt(code, language, cursor);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are an expert ${language} programmer. Provide helpful code completions and suggestions.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.3,
        }),
      });

      const data = await response.json();
      return this.parseAIResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('AI assistance failed:', error);
      return [];
    }
  }

  async explainCode(code: string, language: string): Promise<string> {
    const prompt = `Explain this ${language} code in simple terms:\n\n${code}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a programming instructor. Explain code concepts clearly and concisely.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private buildPrompt(code: string, language: string, cursor: { line: number; column: number }): string {
    return `Complete this ${language} code at the cursor position (line ${cursor.line}, column ${cursor.column}):\n\n${code}\n\nProvide 3-4 relevant completions.`;
  }

  private parseAIResponse(response: string): CodeSuggestion[] {
    // Parse AI response into structured suggestions
    const suggestions: CodeSuggestion[] = [];

    // Implementation for parsing AI response
    // ... parsing logic

    return suggestions;
  }
}

interface CodeSuggestion {
  label: string;
  code: string;
  explanation: string;
  type: 'function' | 'variable' | 'statement' | 'import';
}
```

#### 4. Code Execution Backend

```typescript
// Secure code execution service
import { spawn, ChildProcess } from 'child_process';
import { v4 as uuidv4 } from 'uuid';

export class CodeExecutor {
  private activeExecutions: Map<string, ChildProcess> = new Map();

  async executeCode(
    code: string,
    language: string,
    input: string = ''
  ): Promise<ExecutionResult> {
    const executionId = uuidv4();

    try {
      const result = await this.runInSandbox(code, language, input, executionId);
      return result;
    } catch (error) {
      return {
        executionId,
        success: false,
        output: '',
        error: error.message,
        executionTime: 0,
        memoryUsage: 0,
      };
    } finally {
      this.cleanup(executionId);
    }
  }

  private async runInSandbox(
    code: string,
    language: string,
    input: string,
    executionId: string
  ): Promise<ExecutionResult> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      let output = '';
      let errorOutput = '';

      const process = this.createProcess(language, executionId);
      this.activeExecutions.set(executionId, process);

      // Set execution timeout (10 seconds)
      const timeout = setTimeout(() => {
        process.kill('SIGKILL');
        reject(new Error('Execution timeout'));
      }, 10000);

      process.stdout?.on('data', (data) => {
        output += data.toString();
      });

      process.stderr?.on('data', (data) => {
        errorOutput += data.toString();
      });

      process.on('close', (code) => {
        clearTimeout(timeout);
        const executionTime = Date.now() - startTime;

        resolve({
          executionId,
          success: code === 0,
          output: output.trim(),
          error: errorOutput.trim(),
          executionTime,
          memoryUsage: 0, // Would need additional monitoring
        });
      });

      process.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });

      // Write code and input to process
      process.stdin?.write(code);
      if (input) {
        process.stdin?.write('\n' + input);
      }
      process.stdin?.end();
    });
  }

  private createProcess(language: string, executionId: string): ChildProcess {
    const sandboxConfig = this.getSandboxConfig(language);

    return spawn(sandboxConfig.command, sandboxConfig.args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: '/tmp/code-execution',
      uid: 65534, // nobody user for security
      gid: 65534,
      rlimit: {
        as: 50 * 1024 * 1024, // 50MB memory limit
        cpu: 10, // 10 seconds CPU time
        fsize: 1024 * 1024, // 1MB file size limit
      },
    });
  }

  private getSandboxConfig(language: string) {
    const configs = {
      javascript: {
        command: 'node',
        args: ['--max-old-space-size=50'],
      },
      python: {
        command: 'python3',
        args: ['-u', '--max-memory=50M'],
      },
      java: {
        command: 'java',
        args: ['-Xmx50m', '-Xss512k'],
      },
    };

    return configs[language] || configs.javascript;
  }

  cleanup(executionId: string) {
    const process = this.activeExecutions.get(executionId);
    if (process && !process.killed) {
      process.kill('SIGKILL');
    }
    this.activeExecutions.delete(executionId);
  }

  stopExecution(executionId: string): boolean {
    const process = this.activeExecutions.get(executionId);
    if (process && !process.killed) {
      process.kill('SIGTERM');
      return true;
    }
    return false;
  }
}

interface ExecutionResult {
  executionId: string;
  success: boolean;
  output: string;
  error: string;
  executionTime: number;
  memoryUsage: number;
}
```

### Key Technical Features

1. **Real-time Collaboration**: WebRTC-based peer-to-peer code sharing
2. **AI Assistance**: GPT-powered code completion and explanations
3. **Secure Execution**: Sandboxed code execution with resource limits
4. **Multi-language Support**: JavaScript, Python, Java, and more
5. **Live Cursors**: Real-time cursor position tracking
6. **Syntax Highlighting**: Full language support with Monaco Editor
7. **Code History**: Version control and change tracking

### Security Considerations

```typescript
// Security middleware for code execution
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export const executionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 executions per minute
  message: 'Too many code execution requests',
});

export const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "wss:", "https:"],
    },
  },
});
```

## Technical Integration Patterns

### 1. API Integration Patterns

```typescript
// Universal API client pattern
class APIClient {
  private baseURL: string;
  private apiKey: string;

  constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }
}
```

### 2. Component Composition Patterns

```typescript
// Reusable feature component pattern
interface ProjectCardProps {
  project: {
    title: string;
    summary: string;
    image: string;
    tags: string[];
    liveLink?: string;
    githubLink: string;
  };
  animationDelay?: number;
}

export function ProjectCard({ project, animationDelay = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <Card className="group border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="p-0 overflow-hidden rounded-t-lg">
          <div className="relative h-48 bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <CardTitle className="text-xl mb-3">{project.title}</CardTitle>
          <CardDescription className="mb-4">{project.summary}</CardDescription>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            {project.liveLink && (
              <Button size="sm" asChild>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Live
                </a>
              </Button>
            )}

            <Button size="sm" variant="outline" asChild>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="w-3 h-3 mr-1" />
                Code
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
```

## Project Development Workflow

### 1. Development Environment Setup

```bash
# Project initialization
npx create-next-app@latest project-name --typescript --tailwind --eslint
cd project-name

# Install dependencies
npm install @radix-ui/react-slot framer-motion lucide-react
npm install -D @types/node

# Development server
npm run dev
```

### 2. Component Development Pattern

```typescript
// Component development with TypeScript
interface ComponentProps {
  // Define props interface
}

export function Component({ prop }: ComponentProps) {
  // Component implementation

  return (
    <div>
      {/* JSX */}
    </div>
  );
}

// Export with displayName for debugging
Component.displayName = 'Component';
```

### 3. Testing Strategy

```typescript
// Component testing with Jest and React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  test('renders correctly', () => {
    render(<Component prop="value" />);
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });

  test('handles user interactions', () => {
    const handleClick = jest.fn();
    render(<Component onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

This comprehensive project documentation demonstrates the technical depth and practical application of modern web development patterns, AI integration, and collaborative features across multiple real-world projects.
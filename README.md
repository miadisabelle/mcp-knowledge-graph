# COAIA Memory - Creative-Oriented AI Assistant Memory System

> MCP server implementing structural tension charts and advancing pattern support based on Robert Fritz's creative methodology

## What is COAIA Memory?

COAIA Memory extends traditional knowledge graphs with **structural tension charts** - a powerful framework for organizing creative processes around desired outcomes rather than problem-solving. Based on Robert Fritz's structural tension methodology, it helps AI assistants maintain creative orientation and support advancing patterns.

**Current Version**: v2.3.0 (AIM-Enhanced) - **Now includes full AIM (AI Memory) integration from Shane Holloman's original work**

## Key Features

### 🎯 Structural Tension Charts
- **Desired Outcomes**: Clear, specific results you want to create
- **Current Reality**: Honest assessment of where you are now  
- **Structural Tension**: The unresolved tension between current reality and desired outcome that naturally seeks resolution
- **Action Steps**: Strategic secondary actions - intermediary end results that advance toward the primary goal
- **Due Dates**: Time organization that creates momentum

### 🔭 Telescoping Support
- Break down complex action steps into detailed sub-charts
- Proper due date inheritance from parent steps
- Hierarchical navigation between overview and details
- Maintains structural tension at every level

### 📈 Advancing Pattern Tracking
- Completed action steps become part of current reality, changing the structural dynamic
- Each completion advances the system toward equilibrium (desired outcome)
- Success creates new structural tension for continued advancement
- Prevents oscillating patterns through proper structural design

### 🗣️ Natural Language Ready
- Conversational patterns documented for intuitive interaction
- Creative-oriented language (focus on creation vs problem-solving)
- AI assistants can guide users through structural tension exercises

### 🔗 Traditional Knowledge Graph
- Full entity, relation, and observation management
- Search and retrieval capabilities
- Compatible with existing MCP knowledge graph workflows

## 🧠 AIM Integration (AI Memory)

**NEW in v2.3.0**: Full integration of Shane Holloman's original AIM (AI Memory) functionality:

### Why AIM?
AIM stands for **AI Memory** - the core concept of this knowledge graph system. The three AIM elements provide clear organization and safety:

- **`.aim` directories**: Keep AI memory files organized and easily identifiable
- **`aim_` tool prefixes**: Group related memory functions together in multi-tool setups
- **`_aim` safety markers**: Each memory file starts with `{"type":"_aim","source":"mcp-knowledge-graph"}` to prevent accidental overwrites

### Storage Logic
**File Location Priority:**

1. **Project with `.aim`** - Uses `.aim/memory.jsonl` (project-local)
2. **No project/no .aim** - Uses configured global directory
3. **Contexts** - Adds suffix: `memory-work.jsonl`, `memory-personal.jsonl`

**Safety System:**
- Every memory file starts with `{"type":"_aim","source":"mcp-knowledge-graph"}`
- System refuses to write to files without this marker
- Prevents accidental overwrite of unrelated JSONL files

### Master Database Concept
**The master database is your primary memory store** - used by default when no specific database is requested. It's always named `default` in listings and stored as `memory.jsonl`.

- **Default Behavior**: All memory operations use the master database unless you specify a different one
- **Always Available**: Exists in both project-local and global locations
- **Primary Storage**: Your main knowledge graph that persists across all conversations
- **Named Databases**: Optional additional databases (`work`, `personal`, `health`) for organizing specific topics

## Installation & Usage

### As NPX Package
```bash
npx coaia-memory --memory-path ./my-charts.jsonl
```

### Global Memory Setup (Recommended for AIM)

Add to your `claude_desktop_config.json` or `.claude.json`:

```json
{
  "mcpServers": {
    "coaia-memory": {
      "command": "npx",
      "args": [
        "-y",
        "coaia-memory",
        "--memory-path",
        "/Users/yourusername/.aim/"
      ]
    }
  }
}
```

This creates memory files in your specified directory:

- `memory.jsonl` - **Master Database** (default for all operations)
- `memory-work.jsonl` - Work database
- `memory-personal.jsonl` - Personal database
- etc.

### Project-Local Memory with .aim

In any project, create a `.aim` directory:

```bash
mkdir .aim
```

Now memory tools automatically use `.aim/memory.jsonl` (project-local **master database**) instead of global storage when run from this project.

### In Claude Desktop Config
```json
{
  "mcpServers": {
    "coaia-memory": {
      "command": "npx",
      "args": ["-y", "coaia-memory", "--memory-path", "/path/to/your/charts.jsonl"],
      "autoapprove": [
        "create_structural_tension_chart",
        "telescope_action_step", 
        "mark_action_complete",
        "get_chart_progress",
        "list_active_charts",
        "create_entities",
        "create_relations",
        "add_observations",
        "aim_create_entities",
        "aim_create_relations",
        "aim_add_observations",
        "aim_search_nodes",
        "aim_read_graph",
        "aim_open_nodes",
        "aim_list_databases"
      ]
    }
  }
}
```

### Local Development
```bash
git clone <repository>
cd coaia-memory
npm install
npm run build
```

## Core Tools

### Structural Tension Chart Management (COAIA)
- `create_structural_tension_chart` - Create new chart with outcome, reality, and action steps
- `telescope_action_step` - Break down action steps into detailed sub-charts
- `mark_action_complete` - Complete actions and update current reality
- `get_chart_progress` - Monitor chart advancement
- `list_active_charts` - Overview of all active charts

### Traditional Knowledge Graph Operations (Legacy)
- `create_entities` - Add new entities (people, concepts, events)
- `create_relations` - Connect entities with relationships
- `add_observations` - Record new information about entities
- Plus full CRUD operations for entities, relations, and observations

### AIM (AI Memory) Tools - New in v2.3.0
- `aim_create_entities` - Add entities with context and location support
- `aim_create_relations` - Connect entities with AIM functionality
- `aim_add_observations` - Add observations with database selection
- `aim_search_nodes` - Search with context and location control
- `aim_read_graph` - Read entire graph with database selection
- `aim_open_nodes` - Retrieve specific entities by name
- `aim_list_databases` - Discover available databases and locations
- `aim_delete_entities`, `aim_delete_observations`, `aim_delete_relations` - Full CRUD support

## How AI Uses Databases

Once configured, AI models use the **master database by default** or can specify named databases with a `context` parameter. New databases are created automatically - no setup required:

```json
// Master Database (default - no context needed)
aim_create_entities({
  entities: [{
    name: "John_Doe",
    entityType: "person",
    observations: ["Met at conference"]
  }]
})

// Work database
aim_create_entities({
  context: "work",
  entities: [{
    name: "Q4_Project",
    entityType: "project",
    observations: ["Due December 2024"]
  }]
})

// Personal database
aim_create_entities({
  context: "personal",
  entities: [{
    name: "Mom",
    entityType: "person",
    observations: ["Birthday March 15th"]
  }]
})

// Master database in specific location
aim_create_entities({
  location: "global",
  entities: [{
    name: "Important_Info",
    entityType: "reference",
    observations: ["Stored in global master database"]
  }]
})
```

## File Organization

**Global Setup:**

```tree
/Users/yourusername/.aim/
├── memory.jsonl           # Master Database (default)
├── memory-work.jsonl      # Work database
├── memory-personal.jsonl  # Personal database
└── memory-health.jsonl    # Health database
```

**Project Setup:**

```tree
my-project/
├── .aim/
│   ├── memory.jsonl       # Project Master Database (default)
│   └── memory-work.jsonl  # Project Work database
└── src/
```

## Database Discovery

Use `aim_list_databases` to see all available databases:

```json
{
  "project_databases": [
    "default",      // Master Database (project-local)
    "project-work"  // Named database
  ],
  "global_databases": [
    "default",      // Master Database (global)
    "work",
    "personal",
    "health"
  ],
  "current_location": "project (.aim directory detected)"
}
```

**Key Points:**

- **"default"** = Master Database in both locations
- **Current location** shows whether you're using project or global storage
- **Master database exists everywhere** - it's your primary memory store
- **Named databases** are optional additions for specific topics

## Configuration Examples

**Important:** Always specify `--memory-path` to control where your memory files are stored.

**Home directory:**

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "coaia-memory",
        "--memory-path",
        "/Users/yourusername/.aim"
      ]
    }
  }
}
```

**Custom location (e.g., Dropbox):**

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "coaia-memory",
        "--memory-path",
        "/Users/yourusername/Dropbox/.aim"
      ]
    }
  }
}
```

**Auto-approve all operations:**

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": [
        "-y",
        "coaia-memory",
        "--memory-path",
        "/Users/yourusername/.aim"
      ],
      "autoapprove": [
        "aim_create_entities",
        "aim_create_relations",
        "aim_add_observations",
        "aim_search_nodes",
        "aim_read_graph",
        "aim_open_nodes",
        "aim_list_databases",
        "create_structural_tension_chart",
        "telescope_action_step",
        "mark_action_complete",
        "list_active_charts"
      ]
    }
  }
}
```

## Example Usage

### Creating Structural Tension Charts (COAIA)
```javascript
// Natural language: "I want to learn Python web development in 6 weeks"
{
  "desiredOutcome": "Learn Python web development", 
  "currentReality": "I know basic Python but no web frameworks",
  "dueDate": "2025-09-15T00:00:00Z",
  "actionSteps": [
    "Complete Django tutorial",
    "Build practice project", 
    "Deploy something live"
  ]
}
```

### Telescoping Detail
```javascript
// Natural language: "Break down the Django tutorial step"
{
  "actionStepName": "chart_123_action_1",
  "newCurrentReality": "Never used Django, familiar with Python basics"
}
```

### Tracking Progress
```javascript
// Natural language: "I finished the Django tutorial"
{
  "actionStepName": "chart_123_action_1"
}
```

### Using AIM Features
```javascript
// List all available databases
aim_list_databases()

// Create entities in work context
aim_create_entities({
  context: "work",
  entities: [{
    name: "New_Client", 
    entityType: "person",
    observations: ["Meeting scheduled for Tuesday", "Interested in web development services"]
  }]
})

// Force project-local storage
aim_create_entities({
  location: "project",
  entities: [{
    name: "Project_Notes",
    entityType: "reference", 
    observations: ["Important implementation details", "Stored locally in .aim directory"]
  }]
})

// Search across personal database
aim_search_nodes({
  context: "personal",
  query: "birthday"
})
```

## Troubleshooting

**"File does not contain required _aim safety marker" error:**

- The file may not belong to this system
- Manual JSONL files need `{"type":"_aim","source":"mcp-knowledge-graph"}` as first line
- If you created the file manually, add the `_aim` marker or delete and let the system recreate it

**Memories going to unexpected locations:**

- Check if you're in a project directory with `.aim` folder (uses project-local storage)
- Otherwise uses the configured global `--memory-path` directory
- Use `aim_list_databases` to see all available databases and current location
- Use `ls .aim/` or `ls /Users/yourusername/.aim/` to see your memory files

**Too many similar databases:**

- AI models try to use consistent names, but may create variations
- Manually delete unwanted database files if needed
- Encourage AI to use simple, consistent database names
- **Remember**: Master database is always available as the default - named databases are optional

**Mixed COAIA and AIM usage:**

- Legacy tools (`create_entities`, etc.) use original single-file format
- AIM tools (`aim_create_entities`, etc.) use AIM format with safety markers
- Use AIM tools for new projects, legacy tools for existing COAIA charts
- Both can coexist but use different storage formats

## Creative Orientation Principles

### Focus on Creation, Not Problem-Solving
- **Use**: "I want to create...", "My desired outcome is..."
- **Avoid**: "I need to fix...", "The problem is...", "I want to stop..."

### Structural Tension Awareness  
- Always pair desired outcomes with current reality to create structural tension
- This unresolved tension naturally seeks resolution through advancement
- Action steps are strategic intermediary results that change the structural dynamic
- Completed actions flow into current reality, creating new tension for continued advancement

### Advancing Patterns
- Success builds on success
- Completed actions become part of current reality
- Momentum creates natural progression toward goals

## Development & Testing

### Build & Test
```bash
npm install
npm run build
```

### Test Environment
```bash
cd test-environment
claude-code  # Launch with pre-configured MCP setup
```

### Testing AIM Functionality
```bash
# Create test project
mkdir test-project && cd test-project
mkdir .aim

# Run coaia-memory
npx coaia-memory --memory-path .aim/

# Test database discovery
# Should show project-local databases when .aim directory exists
```

## Release Status

### ✅ Validated in v2.3.0
- **Core Structural Tension Charts**: Fully functional with proper entity relationships
- **Telescoping Support**: Action steps break down into sub-charts with due date inheritance
- **Advancing Pattern Tracking**: Completions flow into current reality, system advances naturally
- **AIM Integration**: Full AIM functionality with .aim directories, safety markers, and multiple databases
- **MCP Integration**: All tools working correctly in Claude Code CLI environment
- **Real-World Testing**: Validated with actual user interactions in test environment
- **Backward Compatibility**: Legacy COAIA tools preserved alongside new AIM functionality

### Next Milestone
**Enhanced User Experience**: Improve database management UX, add guided setup for .aim directories, and provide better error messages for common configuration issues.

## Architecture

### Enhanced Entity Types
- `structural_tension_chart` - Container for chart components
- `desired_outcome` - What you want to create
- `current_reality` - Where you are now  
- `action_step` - Strategic actions with due dates

### Creative Relations
- `creates_tension_with` - Between current reality and desired outcome
- `advances_toward` - Action steps advancing toward outcomes
- `telescopes_into` - Hierarchical chart relationships
- `flows_into` - Completed actions updating reality

### Metadata Support
- Due dates and completion tracking
- Chart hierarchy and telescoping relationships
- Creative phases (germination, assimilation, completion)
- Timestamps and progress metrics

## Credits

- **Author**: J.Guillaume D.-Isabelle <jgi@jgwill.com> (https://github.com/jgwill)
- **Methodology**: Robert Fritz - Structural Tension (https://robertfritz.com)  
- **AIM Foundation**: Shane Holloman - Original MCP Knowledge Graph (https://github.com/shaneholloman/mcp-knowledge-graph)
- **License**: MIT

## Philosophy

COAIA Memory embodies the principle that **structure determines behavior**. By organizing memory around structural tension rather than problem-solving patterns, it naturally supports creative advancement and helps users build the life they want to create.

The system recognizes that structural tension is the fundamental organizing principle of the creative process - not a problem to be solved, but a generative force to be harnessed.

The integration of AIM (AI Memory) functionality provides the robust infrastructure needed to support both creative processes and traditional knowledge management, making COAIA Memory a comprehensive solution for AI-assisted memory and goal achievement.
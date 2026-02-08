import { defineConfig } from 'vitepress'
export default defineConfig({
  title: "Vex Language",
  description: "Modern Systems Programming with Auto-Vectorization",
  markdown:{
    languageAlias:{
      "vex":"rust"
    },
    html: false
  },
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Reference', link: '/specs/01_Introduction_and_Overview' },
      { text: 'Architecture', link: '/architecture/' },
      { text: 'Packages', link: 'https://packages.vex-lang.org' },
      { text: 'Blog', link: 'https://blog.vex-lang.org' }
    ],

    search: {
      provider: 'local'
    },

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
          ]
        },
        {
          text: 'Language Basics',
          items: [
            { text: 'Syntax Overview', link: '/guide/basics/syntax' },
            { text: 'Variables', link: '/guide/basics/variables' },
            { text: 'Functions', link: '/guide/basics/functions' },
            { text: 'Control Flow', link: '/guide/basics/control-flow' },
          ]
        },
        {
          text: 'Type System',
          items: [
            { text: 'Primitive Types', link: '/guide/types/primitives' },
            { text: 'Structs', link: '/guide/types/structs' },
            { text: 'Enums', link: '/guide/types/enums' },
            { text: 'Contracts', link: '/guide/types/traits' },
            { text: 'Generics', link: '/guide/types/generics' },
            { text: 'Type Aliases', link: '/guide/types/aliases' },
          ]
        },
        {
          text: 'Memory & Ownership',
          items: [
            { text: 'Ownership Model', link: '/guide/memory/ownership' },
            { text: 'Borrowing', link: '/guide/memory/borrowing' },
            { text: 'Automatic Lifetimes', link: '/guide/memory/lifetimes' },
            { text: 'VUMM', link: '/guide/memory/vumm' },
          ]
        },
        {
          text: 'Concurrency',
          items: [
            { text: 'Overview', link: '/guide/concurrency/overview' },
            { text: "Channels", link: '/guide/concurrency/channels' },
            { text: 'Async/Await', link: '/guide/concurrency/async' },
          ]
        },
        {
          text: 'SIMD & GPU',
          items: [
            { text: 'Auto-Vectorization', link: '/guide/simd/' },
            { text: 'Tensor & Mask Types', link: '/guide/simd/tensor-mask' },
            { text: 'SIR Pipeline', link: '/guide/simd/sir-pipeline' },
            { text: 'GPU with SIR', link: '/guide/gpu/' },
          ]
        },
        {
          text: 'Error Handling',
          items: [
            { text: 'Error Handling', link: '/guide/error-handling' },
          ]
        },
        {
          text: 'Modules & Stdlib',
          items: [
            { text: 'Modules', link: '/guide/modules' },
            { text: 'Standard Library', link: '/guide/stdlib' },
          ]
        },
        {
          text: 'FFI & Advanced',
          items: [
            { text: 'FFI', link: '/guide/ffi' },
            { text: 'Freestanding', link: '/guide/freestanding' },
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Autograd', link: '/guide/advanced/autograd' },
            { text: 'Unsafe Code', link: '/guide/advanced/unsafe' },
            { text: 'Raw Pointers', link: '/guide/advanced/pointers' },
            { text: 'Methods & Constructors', link: '/guide/advanced/methods' },
            { text: 'Operator Overloading', link: '/guide/advanced/operators' },
            { text: 'Comptime', link: '/guide/advanced/comptime' },
            { text: 'Builtins', link: '/guide/advanced/builtins' },
          ]
        },
        {
          text: 'Tooling',
          items: [
            { text: 'Testing', link: '/guide/tooling/testing' },
          ]
        },
      ],
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
          ]
        }
      ],
      '/specs/': [
      {
        text: 'Introduction',
        items: [
          { text: 'Introduction & Overview', link: '/specs/01_Introduction_and_Overview' },
          { text: 'Directory Structure', link: '/specs/VEX_DIR_STRUCTURE' },
          { text: 'Architecture Details', link: '/extra/Architecture' },
          { text: 'Full Reference', link: '/extra/Reference' },
        ]
      },
      {
        text: 'Baseline Features',
        items: [
          { text: 'Overview', link: '/specs/Baseline/' },
          { text: '01. Literals', link: '/specs/Baseline/01_literals' },
          { text: '02. Primitive Types', link: '/specs/Baseline/02_primitive_types' },
          { text: '03. Arithmetic Ops', link: '/specs/Baseline/03_arithmetic_ops' },
          { text: '04. Comparison Ops', link: '/specs/Baseline/04_comparison_ops' },
          { text: '05. Logical Ops', link: '/specs/Baseline/05_logical_ops' },
          { text: '06. Bitwise Ops', link: '/specs/Baseline/06_bitwise_ops' },
          { text: '07. Variables', link: '/specs/Baseline/07_variables' },
          { text: '08. If Statements', link: '/specs/Baseline/08_if_statements' },
          { text: '09. While Loops', link: '/specs/Baseline/09_while_loops' },
          { text: '10. For Loops', link: '/specs/Baseline/10_for_loops' },
          { text: '11. Functions', link: '/specs/Baseline/11_functions' },
          { text: '12. Strings', link: '/specs/Baseline/12_strings' },
          { text: '13. Arrays', link: '/specs/Baseline/13_arrays' },
        ]
      },
      {
        text: 'Core Language',
        items: [
          { text: 'Lexical Structure', link: '/specs/02_Lexical_Structure' },
          { text: 'Type System', link: '/specs/03_Type_System' },
          { text: 'Variables & Constants', link: '/specs/04_Variables_and_Constants' },
          { text: 'Functions & Methods', link: '/specs/05_Functions_and_Methods' },
          { text: 'Control Flow', link: '/specs/06_Control_Flow' },
          { text: 'Error Handling', link: '/specs/17_Error_Handling' },
          { text: 'Modules & Imports', link: '/specs/15_Modules_and_Imports' },
        ]
      },
      {
        text: 'Data Structures',
        items: [
          { text: 'Structs', link: '/specs/07_Structs_and_Data_Types' },
          { text: 'Enums', link: '/specs/08_Enums' },
          { text: 'Contracts', link: '/specs/09_Contracts' },
          { text: 'Generics', link: '/specs/10_Generics' },
          { text: 'Conditional Types', link: '/specs/10a_Conditional_Types' },
          { text: 'Pattern Matching', link: '/specs/11_Pattern_Matching' },
        ]
      },
      {
        text: 'Advanced Features',
        items: [
          { text: 'Closures', link: '/specs/12_Closures_and_Lambda_Expressions' },
          { text: 'Concurrency', link: '/specs/13_Concurrency' },
          { text: 'Memory Management', link: '/specs/14_Memory_Management' },
          { text: 'RAII Model', link: '/extra/RAII_Model' },
          { text: 'Comptime Guide', link: '/extra/Comptime' },
          { text: 'Operator Overloading', link: '/specs/23_Operator_Overloading' },
          { text: 'Policy System', link: '/specs/20_Policy_System' },
          { text: 'Mutability', link: '/specs/21_Mutability_and_Pointers' },
          { text: 'Vectorization & Autograd', link: '/specs/27_Vectorization_and_Autograd' },
        ]
      },
      {
        text: 'Systems & Tooling',
        items: [
          { text: 'Standard Library', link: '/specs/16_Standard_Library' },
          { text: 'Package Manager', link: '/specs/19_Package_Manager' },
          { text: 'FFI & Raw Pointers', link: '/specs/18_Raw_Pointers_and_FFI' },
          { text: 'Intrinsics', link: '/specs/22_Intrinsics_and_Low_Level_Operations' },
          { text: 'Optimization', link: '/specs/25_Automatic_Optimization' },
          { text: 'Context', link: '/specs/24_Context' },
          { text: 'Testing', link: '/specs/26_Testing_Infrastructure' },
          { text: 'Documentation Tool', link: '/extra/Vex_Doc' },
          { text: 'Builtins', link: '/specs/99_BUILTINS' },
          { text: 'Auto-Vectorization Guide', link: '/extra/Auto_Vectorization' },
          { text: 'SPIR-V Mapping', link: '/extra/SPIRV_Mapping' },
        ]
      },
      {
        text: 'Language Comparisons',
        items: [
          { text: 'General Syntax', link: '/specs/Comparison/01_General_Syntax' },
        ]
      }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/meftunca/vex' }
    ]
  }
})

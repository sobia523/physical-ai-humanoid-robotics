# Chapter 11: Real-Time Systems & Edge AI

## Introduction

Humanoid robots require real-time processing with strict latency constraints. This chapter covers real-time operating systems, edge AI deployment, and optimization techniques.

---

## 1. Real-Time Computing Fundamentals

### 1.1 Hard vs. Soft Real-Time
- **Hard**: Missing deadline causes system failure (motor control)
- **Soft**: Performance degrades gracefully (vision processing)

### 1.2 Scheduling Algorithms
- Rate Monotonic Scheduling (RMS)
- Earliest Deadline First (EDF)
- Priority inheritance

---

## 2. Real-Time Operating Systems

### 2.1 RTOS Options
- **RT-Linux**: Preempt-RT patch
- **VxWorks**: Commercial, safety-certified
- **QNX**: Microkernel architecture
- **FreeRTOS**: Embedded systems

### 2.2 ROS 2 Real-Time
- DDS middleware with QoS policies
- Real-time executors
- Memory management (lock-free queues)

**Code**:
```cpp
#include "rclcpp/rclcpp.hpp"
#include "rclcpp/executors/static_single_threaded_executor.hpp"

int main(int argc, char** argv) {
    rclcpp::init(argc, argv);
    
    // Real-time executor
    rclcpp::executors::StaticSingleThreadedExecutor executor;
    auto node = std::make_shared<ControlNode>();
    executor.add_node(node);
    
    // Set thread priority
    sched_param param;
    param.sched_priority = 99;  // Highest priority
    pthread_setschedparam(pthread_self(), SCHED_FIFO, &param);
    
    executor.spin();
    return 0;
}
```

---

## 3. Edge AI Deployment

### 3.1 Model Optimization
**Quantization**:
- FP32 → INT8 (4x speedup, minimal accuracy loss)
- Post-training quantization
- Quantization-aware training

**Pruning**:
- Remove redundant weights
- Structured vs. unstructured pruning

**Knowledge Distillation**:
- Train small model to mimic large model

### 3.2 Hardware Accelerators
- **GPUs**: NVIDIA Jetson (Orin, Xavier)
- **TPUs**: Google Coral Edge TPU
- **FPGAs**: Xilinx Zynq
- **ASICs**: Tesla FSD chip

**Comparison**:
| Platform | Power | TOPS | Latency |
|----------|-------|------|---------|
| Jetson Orin | 60W | 275 | 5-10ms |
| Coral TPU | 2W | 4 | 2-5ms |
| FSD Chip | 72W | 144 | 1-3ms |

---

## 4. Inference Optimization

### 4.1 TensorRT (NVIDIA)
```python
import tensorrt as trt

# Convert PyTorch model to TensorRT
model = torch.load('model.pth')
traced = torch.jit.trace(model, example_input)

# Build TensorRT engine
with trt.Builder(TRT_LOGGER) as builder:
    network = builder.create_network()
    parser = trt.OnnxParser(network, TRT_LOGGER)
    parser.parse(onnx_model)
    
    config = builder.create_builder_config()
    config.set_flag(trt.BuilderFlag.INT8)  # Enable INT8
    
    engine = builder.build_engine(network, config)
```

### 4.2 ONNX Runtime
- Cross-platform inference
- Supports multiple backends (CPU, GPU, TensorRT)

---

## 5. Case Studies

### 5.1 Boston Dynamics Spot
- Custom FPGA for vision processing
- Real-time MPC at 333 Hz
- Distributed computing (onboard + offboard)

### 5.2 Tesla Optimus
- FSD chip (custom ASIC)
- INT8 inference for vision
- 100 Hz whole-body control

---

## 6. Lab Activity: Model Quantization

### Objective
Quantize a neural network and measure speedup.

**Code**:
```python
import torch
from torch.quantization import quantize_dynamic

# Original model
model = YourModel()
model.eval()

# Dynamic quantization
quantized_model = quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

# Benchmark
import time
input_tensor = torch.randn(1, 3, 224, 224)

start = time.time()
for _ in range(100):
    _ = model(input_tensor)
fp32_time = time.time() - start

start = time.time()
for _ in range(100):
    _ = quantized_model(input_tensor)
int8_time = time.time() - start

print(f"Speedup: {fp32_time / int8_time:.2f}x")
```

---

## Summary
- ✅ Real-time computing and RTOS
- ✅ Model optimization (quantization, pruning)
- ✅ Edge AI hardware (GPUs, TPUs, FPGAs)
- ✅ Inference frameworks (TensorRT, ONNX)

---

## Review Questions
1. Prove Rate Monotonic Scheduling is optimal for fixed-priority systems
2. Compare quantization vs. pruning for model compression
3. Design a real-time perception pipeline for humanoid robots

---

## References
1. Buttazzo, G. C. (2011). *Hard Real-Time Computing Systems*. Springer.
2. Jacob, B., et al. (2018). "Quantization and training of neural networks for efficient integer-arithmetic-only inference." *CVPR*.

---

**Next**: [Chapter 12: Digital Twins & Simulation Systems](/docs/module-04/chapter-12)

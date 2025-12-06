# Chapter 5: Computer Vision for Robotics

## Introduction

Computer vision enables robots to perceive and understand their environment. This chapter covers essential vision techniques for humanoid robotics, from object detection to visual servoing.

---

## 1. Image Formation & Camera Models

### 1.1 Pinhole Camera Model
Projection equation:
$$\begin{bmatrix} u \\ v \\ 1 \end{bmatrix} = K \begin{bmatrix} X/Z \\ Y/Z \\ 1 \end{bmatrix}$$

Where $K$ is the camera intrinsic matrix.

### 1.2 Camera Calibration
- Zhang's method
- Checkerboard patterns
- Intrinsic vs. extrinsic parameters

---

## 2. Object Detection & Recognition

### 2.1 Classical Methods
- SIFT, SURF features
- HOG descriptors
- Template matching

### 2.2 Deep Learning Approaches
**YOLO (You Only Look Once)**:
- Real-time object detection
- Single-stage detector
- Trade-off: speed vs. accuracy

**Mask R-CNN**:
- Instance segmentation
- Region proposals + classification
- Applications: Grasp planning

**Code Example**:
```python
import torch
from torchvision.models.detection import fasterrcnn_resnet50_fpn

model = fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

# Inference
predictions = model(image_tensor)
boxes = predictions[0]['boxes']
labels = predictions[0]['labels']
scores = predictions[0]['scores']
```

---

## 3. Pose Estimation

### 3.1 2D Pose Estimation
- Keypoint detection (OpenPose, MediaPipe)
- Applications: Human-robot interaction

### 3.2 6D Object Pose
- PnP (Perspective-n-Point) algorithm
- Deep learning: PoseCNN, DenseFusion
- Applications: Robotic grasping

---

## 4. Depth Estimation

### 4.1 Stereo Vision
- Epipolar geometry
- Disparity maps
- Semi-Global Matching (SGM)

### 4.2 Monocular Depth
- Self-supervised learning (Monodepth2)
- Applications: Navigation without LiDAR

---

## 5. Visual Servoing

### 5.1 Image-Based Visual Servoing (IBVS)
Control robot based on image features:
$$\dot{s} = L_s v$$

Where $L_s$ is the interaction matrix.

### 5.2 Position-Based Visual Servoing (PBVS)
Estimate 3D pose, then control in Cartesian space.

**Case Study**: Tesla Optimus uses vision-only for manipulation

---

## 6. Lab Activity: Object Detection Pipeline

### Objective
Implement real-time object detection for robotic grasping.

### Task
1. Capture images from robot camera
2. Run YOLO detection
3. Filter by confidence threshold
4. Publish bounding boxes to ROS 2

**Code**:
```python
import cv2
from ultralytics import YOLO

model = YOLO('yolov8n.pt')

cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    results = model(frame)
    annotated = results[0].plot()
    cv2.imshow('Detection', annotated)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

---

## Summary
- ✅ Camera models and calibration
- ✅ Object detection with YOLO/Mask R-CNN
- ✅ Pose estimation for manipulation
- ✅ Visual servoing for closed-loop control

---

## Review Questions
1. Derive the pinhole camera projection equation
2. Compare YOLO and Mask R-CNN for robotic applications
3. Implement stereo depth estimation from scratch

---

## References
1. Hartley, R., & Zisserman, A. (2004). *Multiple View Geometry*. Cambridge University Press.
2. Redmon, J., et al. (2016). "You Only Look Once: Unified real-time object detection." *CVPR*.

---

**Next**: [Chapter 6: Reinforcement Learning & Embodied AI](/docs/module-02/chapter-06)

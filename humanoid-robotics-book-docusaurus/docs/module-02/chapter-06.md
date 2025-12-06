# Chapter 6: Reinforcement Learning & Embodied AI

## Introduction

Reinforcement Learning (RL) enables robots to learn complex behaviors through trial and error. This chapter explores how RL is applied to physical systems, from locomotion to manipulation.

---

## 1. RL Fundamentals

### 1.1 Markov Decision Process (MDP)
- States $s \in \mathcal{S}$
- Actions $a \in \mathcal{A}$
- Transition dynamics $P(s'|s,a)$
- Reward function $R(s,a)$

### 1.2 Value Functions
**State-value function**:
$$V^\pi(s) = \mathbb{E}_\pi \left[ \sum_{t=0}^\infty \gamma^t R_t | S_0 = s \right]$$

**Action-value function** (Q-function):
$$Q^\pi(s,a) = \mathbb{E}_\pi \left[ \sum_{t=0}^\infty \gamma^t R_t | S_0 = s, A_0 = a \right]$$

---

## 2. Policy Gradient Methods

### 2.1 REINFORCE Algorithm
$$\nabla_\theta J(\theta) = \mathbb{E}_\pi \left[ \nabla_\theta \log \pi_\theta(a|s) Q^\pi(s,a) \right]$$

### 2.2 Actor-Critic
- **Actor**: Policy network $\pi_\theta(a|s)$
- **Critic**: Value network $V_\phi(s)$

**Advantage function**:
$$A(s,a) = Q(s,a) - V(s)$$

---

## 3. Deep RL for Robotics

### 3.1 Proximal Policy Optimization (PPO)
- Clipped surrogate objective
- Stable training for continuous control
- Used in: OpenAI Dactyl (robotic hand)

### 3.2 Soft Actor-Critic (SAC)
- Off-policy algorithm
- Maximum entropy RL
- Sample-efficient for robotics

**Code Example**:
```python
import gym
from stable_baselines3 import SAC

env = gym.make('HumanoidStandup-v4')
model = SAC('MlpPolicy', env, verbose=1)
model.learn(total_timesteps=1_000_000)
model.save('humanoid_sac')
```

---

## 4. Sim-to-Real Transfer

### 4.1 Domain Randomization
Randomize simulation parameters:
- Friction coefficients
- Object masses
- Lighting conditions
- Sensor noise

**Result**: Policy robust to real-world variation

### 4.2 System Identification
Learn simulator parameters from real data

---

## 5. Case Studies

### 5.1 Agility Robotics Digit
- RL for bipedal locomotion
- Trained in Isaac Gym (GPU-accelerated)
- Deployed on hardware with minimal fine-tuning

### 5.2 Google RT-2
- Vision-language-action model
- Pre-trained on internet data + robot demonstrations
- Zero-shot generalization to new tasks

---

## 6. Lab Activity: Training a Locomotion Policy

### Objective
Train a humanoid to walk using PPO in simulation.

### Environment
- MuJoCo Humanoid-v4
- Reward: Forward velocity - energy cost

**Code**:
```python
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv

env = DummyVecEnv([lambda: gym.make('Humanoid-v4')])
model = PPO('MlpPolicy', env, n_steps=2048, batch_size=64)
model.learn(total_timesteps=5_000_000)

# Evaluate
obs = env.reset()
for _ in range(1000):
    action, _ = model.predict(obs, deterministic=True)
    obs, reward, done, info = env.step(action)
    env.render()
```

---

## Summary
- ✅ MDP formulation for robotic tasks
- ✅ Policy gradient methods (PPO, SAC)
- ✅ Sim-to-real transfer techniques
- ✅ Real-world applications (Digit, RT-2)

---

## Review Questions
1. Derive the policy gradient theorem
2. Compare on-policy (PPO) vs. off-policy (SAC) for robotics
3. Design a reward function for humanoid walking

---

## References
1. Sutton, R. S., & Barto, A. G. (2018). *Reinforcement Learning: An Introduction*. MIT Press.
2. Schulman, J., et al. (2017). "Proximal Policy Optimization Algorithms." *arXiv*.

---

**Next Module**: [Module 3: Humanoid Robot Engineering](/docs/module-03/intro)

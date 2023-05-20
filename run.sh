#!/bin/bash
reader=1
while true; do
  node main.js
  sleep 1
  echo "completed! view $reader"
  ((reader++))
done

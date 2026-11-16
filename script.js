const goal = 2000;
const currentEl = document.getElementById('current');
const goalEl = document.getElementById('goal');
const todayEl = document.getElementById('today');
const progressCircle = document.querySelector('.progress');
const r = 95;
const circumference = 2 * Math.PI * r;
progressCircle.style.strokeDasharray = circumference;

// 获取今天日期字符串，用来区分每天数据
function getTodayKey(){
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

// 读取本地存储
function loadData(){
  const key = getTodayKey();
  const all = JSON.parse(localStorage.getItem('waterData') || '{}');
  return all[key] || 0;
}
// 保存
function saveData(val){
  const key = getTodayKey();
  const all = JSON.parse(localStorage.getItem('waterData') || '{}');
  all[key] = val;
  localStorage.setItem('waterData', JSON.stringify(all));
}

// 更新视图
function render(){
  let current = loadData();
  currentEl.innerText = current;
  goalEl.innerText = goal;
  const percent = Math.min(current / goal, 1);
  const offset = circumference * (1 - percent);
  progressCircle.style.strokeDashoffset = offset;
  const now = new Date();
  todayEl.innerText = `📅 ${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日`;
}

// 添加水量按钮
document.querySelectorAll('.add-btn').forEach(btn=>{
  btn.onclick = ()=>{
    let val = Number(btn.dataset.ml);
    let now = loadData();
    now += val;
    saveData(now);
    render();
  }
})

// 重置
document.querySelector('.reset-btn').onclick = ()=>{
  saveData(0);
  render();
}

// 初始化
render();

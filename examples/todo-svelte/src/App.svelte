<script>
	import { globalStore } from "./store";
	import { svelteSyncedStore } from "./svelteSyncedStore";
	import { filterArray } from "@syncedstore/core";
	
	const ENTER_KEY = 13;
	const ESCAPE_KEY = 27;

	let currentFilter = 'all';
	let store = svelteSyncedStore(globalStore);
	let editing = null;

	$: items = $store.todos;

	const updateView = () => {
		currentFilter = 'all';
		if (window.location.hash === '#/active') {
			currentFilter = 'active';
		} else if (window.location.hash === '#/completed') {
			currentFilter = 'completed';
		}
	};

	window.addEventListener('hashchange', updateView);
	updateView();

	function clearCompleted() {
		filterArray(items, item => !item.completed);
	}

	function remove(index) {
		items.splice(index, 1);
	}

	function toggleAll(event) {
		items.forEach(item => {
			item.completed = event.target.checked;	
		});
	}

	function createNew(event) {
		if (event.which === ENTER_KEY) {
			items.push({
				title: event.target.value,
				completed: false
			});
			event.target.value = '';
		}
	}

	function handleEdit(event) {
		if (event.which === ENTER_KEY) event.target.blur();
		else if (event.which === ESCAPE_KEY) editing = null;
	}

	function submit(event) {
		items[editing].title = event.target.value;
		editing = null;
	}

	$: filtered = currentFilter === 'all'
		? items
		: currentFilter === 'completed'
			? items.filter(item => item.completed)
			: items.filter(item => !item.completed);

	$: numActive = items.filter(item => !item.completed).length;

	$: numCompleted = items.filter(item => item.completed).length;

	
</script>
<section class="todoapp">

<header class="header">
	<h1>todos</h1>
	<input
		class="new-todo"
		on:keydown={createNew}
		placeholder="What needs to be done?"
		autofocus
	>
</header>

{#if items.length > 0}
	<section class="main">
		<input id="toggle-all" class="toggle-all" type="checkbox" on:change={toggleAll} checked="{numCompleted === items.length}">
		<label for="toggle-all">Mark all as complete</label>

		<ul class="todo-list">
			{#each filtered as item, index}
				<li class="{item.completed ? 'completed' : ''} {editing === index ? 'editing' : ''}">
					<div class="view">
						<input class="toggle" type="checkbox" bind:checked={item.completed}>
						<label on:dblclick="{() => editing = index}">{item.title}</label>
						<button on:click="{() => remove(index)}" class="destroy"></button>
					</div>

					{#if editing === index}
						<input
							value='{item.title}'
							id="edit"
							class="edit"
							on:keydown={handleEdit}
							on:blur={submit}
							autofocus
						>
					{/if}
				</li>
			{/each}
		</ul>

		<footer class="footer">
			<span class="todo-count">
				<strong>{numActive}</strong> {numActive === 1 ? 'item' : 'items'} left
			</span>

			<ul class="filters">
				<li><a class="{currentFilter === 'all' ? 'selected' : ''}" href="#/">All</a></li>
				<li><a class="{currentFilter === 'active' ? 'selected' : ''}" href="#/active">Active</a></li>
				<li><a class="{currentFilter === 'completed' ? 'selected' : ''}" href="#/completed">Completed</a></li>
			</ul>

			{#if numCompleted}
				<button class="clear-completed" on:click={clearCompleted}>
					Clear completed
				</button>
			{/if}
		</footer>
	</section>
{/if}
</section>
<script>

	export let src;
	export let alt = '';
	export let sizes = [400,900,1400,2000];

	function url( width ){
		return `${src}?nf_resize=fit&w=${width}`;
	}

	function srcset( widths ){
		let set = widths.map(width => {
			return `${url( width )} ${width}w`;
		});
		return set.join(', ');
	}

</script>

<figure>
	<img src="{url(sizes[0])}" srcset={srcset(sizes)} {alt} loading="lazy" />
</figure>

<style>
</style>

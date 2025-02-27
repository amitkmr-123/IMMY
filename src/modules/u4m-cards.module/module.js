{% for item in module.cards_items_group %}
	{% if item.image_field.src %}
		{% set sizeAttrs = 'width="{{ item.image_field.width|escape_attr }}" height="{{ item.image_field.height|escape_attr }}"' %}
		{% if item.image_field.size_type == 'auto' %}
			{% set sizeAttrs = 'width="{{ item.image_field.width|escape_attr }}" height="{{ item.image_field.height|escape_attr }}" style="max-width: 100%; height: auto;"' %}
		{% elif item.image_field.size_type == 'auto_custom_max' %}
			{% set sizeAttrs = 'width="{{ item.image_field.max_width|escape_attr }}" height="{{ item.image_field.max_height|escape_attr }}" style="max-width: 100%; height: auto;"' %}
		{% endif %}
		 {% set loadingAttr = item.image_field.loading != 'disabled' ? 'loading="{{ item.image_field.loading|escape_attr }}"' : '' %}
		<img src="{{ item.image_field.src|escape_url }}" alt="{{ item.image_field.alt|escape_attr }}" {{ loadingAttr }} {{ sizeAttrs }}>
	{% endif %}
	{{ item.icon_type }}
	{% if item.img.src %}
		{% set sizeAttrs = 'width="{{ item.img.width|escape_attr }}" height="{{ item.img.height|escape_attr }}"' %}
		{% if item.img.size_type == 'auto' %}
			{% set sizeAttrs = 'width="{{ item.img.width|escape_attr }}" height="{{ item.img.height|escape_attr }}" style="max-width: 100%; height: auto;"' %}
		{% elif item.img.size_type == 'auto_custom_max' %}
			{% set sizeAttrs = 'width="{{ item.img.max_width|escape_attr }}" height="{{ item.img.max_height|escape_attr }}" style="max-width: 100%; height: auto;"' %}
		{% endif %}
		 {% set loadingAttr = item.img.loading != 'disabled' ? 'loading="{{ item.img.loading|escape_attr }}"' : '' %}
		<img src="{{ item.img.src|escape_url }}" alt="{{ item.img.alt|escape_attr }}" {{ loadingAttr }} {{ sizeAttrs }}>
	{% endif %}
	{% icon
		name="{{ item.normal_icon.name }}"
		style="{{ item.normal_icon.type }}"
		unicode="{{ item.normal_icon.unicode }}"
		icon_set="{{ item.normal_icon.icon_set }}"
	%}
	{{ item.cards_icon_theme_group.select_color }}
	{{ item.cards_icon_background_group.select_color }}
	{% if item.include_eyebrow_text %}
		<!-- HTML to show when checked -->
	{% endif %}
	{% inline_text field="eyebrow_text" value="{{ item.eyebrow_text }}" %}
	{% if item.include_heading %}
		<!-- HTML to show when checked -->
	{% endif %}
	{{ item.heading_size }}
	{% inline_text field="heading" value="{{ item.heading }}" %}
	{% if item.include_content %}
		<!-- HTML to show when checked -->
	{% endif %}
	{{ item.content_style }}
	{% inline_rich_text field="content" value="{{ item.content }}" %}
	{% if item.include_button %}
		<!-- HTML to show when checked -->
	{% endif %}
	{{ item.button_group.button_type }}
	{{ item.button_group.button_style }}
	{{ item.button_group.button_size }}
	{% inline_text field="button_group.button_text" value="{{ item.button_group.button_text }}" %}
	{% set href = item.button_group.link.url.href %}
	{% if item.button_group.link.url.type is equalto "EMAIL_ADDRESS" %}
	  {% set href = "mailto:" + href %}
	{% endif %}
	<a
	  {% if item.button_group.link.url.type is equalto "CALL_TO_ACTION"  %}
	    href="{{ href }}" {# The href here is not escaped as it is not editable and functions as a JavaScript call to the associated CTA #}
	  {% else %}
	    href="{{ href|escape_url }}"
	  {% endif %}
	  {% if item.button_group.link.open_in_new_tab %}
	    target="_blank"
	  {% endif %}
	  {% if item.button_group.link.rel %}
	    rel="{{ item.button_group.link.rel|escape_attr }}"
	  {% endif %}
	  >
	  Link text
	</a>
	{% cta guid="{{ item.button_group.cta }}" %}
{% endfor %}
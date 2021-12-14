from bokeh.plotting import figure, show
from bokeh.layouts import gridplot, Row
from bokeh.models import ColumnDataSource, CDSView, BooleanFilter, CustomJS, BoxSelectTool, HoverTool
import pandas as pd

data = {'x': [1, 2, 3],
        'y':[1, 2, 3],
        'xs':[[9, 8, 7], [6, 5, 4], [3, 2, 1]],
        'ys':[[29, 28, 29], [27, 28, 27], [25, 25, 20]],
        'colors':['red', 'green', 'blue'],
        }
source = ColumnDataSource(data)
plot = figure(title = 'PLOT IN HOVER TOOLTIP', tools = '')
circles = plot.circle('x', 'y', size = 20, source = source)

plot_tooltip = figure(name = 'plot_tooltip', plot_width = 200, plot_height = 200, x_axis_location = None, y_axis_location = None, title = None, tools = 'hover', tooltips = [("x", "@x"), ("y", "@y"),("color","@colors")], toolbar_location = None)
lines = plot_tooltip.line('x', 'y', source = ColumnDataSource({'x': [], 'y': []}))
circles2 = plot_tooltip.circle('x', 'y', source = ColumnDataSource({'x': [], 'y': []}))

code = """
console.log(cb_data);
"""

callback = CustomJS(args = dict(source = source, lines = lines, circles = circles2, plot_tooltip = plot_tooltip), code = code)

hover = HoverTool()
hover.callback = callback
# hover.tooltips = None
hover.renderers = [circles]
plot.add_tools(hover)

show(plot)